angular.module('app.googleMapController', [])
  .controller('GoogleMapController', function($scope, $modal, MapService, d3Service) {

    // $scope.spotColors = ['#EBF5FF', '#ADD6FF', '#70B8FF', '#3399FF', '#246BB2'];
    // $scope.spotColors = ['#F0FFFA', '#C2FFEB', '#94FFDB', '#66FFCC', '#3D997A'];
    $scope.spotColors = ['#E6FAF5', '#99EBD6', '#4DDBB8', '#00CC99', '#008F6B'];

    $scope.open = function() {
      console.log('scope clicked')
      // TODO: Add modal animation toggle
      // $scope.animationsEnabled = true;
      //
      // $scope.toggleAnimation = function() {
      //   $scope.animationsEnabled = !$scope.animationsEnabled;
      // }
      var context = this;
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'detailsModal.html',
        controller: 'DetailsController',
        size: 'lg',
        resolve: {
          forecast: function () {
            return JSON.parse(angular.element(context).attr('forecast'))[0];
          },
          beachName: function() {
            return JSON.parse(angular.element(context).attr('name'));
          }
        }
      });
    };  

    // loc will be a twople representing [lat, lng]
    // distance will be a number of miles
    $scope.getBestWavesFromLoc = function (loc, distance) {
      MapService.getBeachData().then(function (beaches) {
        loc = new google.maps.LatLng(loc[0], loc[1]);
        var beachesWithinDistance = _.filter(beaches, function(beach) {
          var beachCoords = new google.maps.LatLng(beach.lat, beach.lon);
          // computeDistanceBetween returns a distance in meters, must convert to mi to 
          beach.distance = google.maps.geometry.spherical.computeDistanceBetween(loc, beachCoords) * 0.00062137;
          return beach.distance <= distance;
        });

        var topBeach = beachesWithinDistance.reduce(function(best, cur) {

          var bestSolidRating = best.forecastData[0].solidRating;
          var bestFadedRating = best.forecastData[0].fadedRating;
          var bestTotalStars = bestSolidRating + bestFadedRating;

          var curSolidRating = cur.forecastData[0].solidRating;
          var curFadedRating = cur.forecastData[0].fadedRating;
          var curTotalStars = curSolidRating + curFadedRating;

          // compare total number of stars first
          if (bestTotalStars === curTotalStars) {
            // compare solid ratings. if there's the same number of stars, the beach with the higher solid rating has less wind and therefore more pleasureable waves
            if (bestSolidRating === curSolidRating) {
              // if both beaches have the same stats, the best will be the closer of the two
              return best.distance < cur.distance ? best : cur;
            }
            return bestSolidRating > curSolidRating ? best : cur;
          }
          return bestTotalStars > curTotalStars ? best : cur;
        });
        console.log('go slay some waves at', topBeach.beachname);
        return topBeach;
      });
    };

    $scope.getBestWavesFromCurrentLoc = function(distance) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = [position.coords.latitude, position.coords.longitude];
          $scope.getBestWavesFromLoc(pos, distance);
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
        handleNoGeolocation(false);
      }
      // can build additional error handling within this 
      function handleNoGeolocation(errorFlag) {
        if (errorFlag) {
          console.log('Error: the Geolocation service failed');
        } else {
          console.log('Error: your browser doesn\'t support geolocation');
        }
      }
    }

    $scope.renderMarkers = function () {
      // All d3 renderings must be done after injecting the d3 library into the controller by calling d3Service.d3()
      d3Service.d3().then(function(d3) {      
        var map = new google.maps.Map(d3.select('#map').node(), {
          zoom: 6,
          center: new google.maps.LatLng(36.958, -119.2658)
        });

        MapService.getBeachData().then(function (beaches) {

          $scope.beaches = beaches;

          var overlay = new google.maps.OverlayView();
          
          overlay.onAdd = function () {
            var layer = d3.select(this.getPanes().overlayMouseTarget).append('div')
              .attr('class', 'beaches');

            overlay.draw = function () {
              var projection = this.getProjection(),
                  padding = 10;

              var marker = layer.selectAll('svg')
                  .data(d3.entries(beaches))
                  .each(transform)
                .enter().append('svg:svg')
                  .each(transform)
                  .attr('class', 'marker');


              marker.append('svg:circle')
                .attr('r', 4.5)
                .attr('cx', padding)
                .attr('cy', padding)
                .attr('fill', function(d) { 
                  if (!d.value.forecastData.length) {
                    return $scope.spotColors[0];
                  }
                  else {
                    return $scope.spotColors[d.value.forecastData[0].solidRating];
                  }
                })
                .attr('forecast', function(d) { 
                  $scope.forecastData = d.value.forecastData
                  return JSON.stringify(d.value.forecastData);
                })
                .attr('position', function(d) {
                  return JSON.stringify([d.value.lat, d.value.lon]);
                })
                .attr('name', function(d){
                  return JSON.stringify(d.value.beachname);
                })
                .each(addListener);


              function transform(d) {
                d = new google.maps.LatLng(d.value.lat, d.value.lon);
                d = projection.fromLatLngToDivPixel(d);
                return d3.select(this)
                    .style('left', (d.x - padding) + 'px')
                    .style('top', (d.y - padding) + 'px');
              }
              function addListener(d) {
                console.log('add listener called')
                google.maps.event.addDomListener(this, 'click', $scope.open);
              }
            };
          };
          overlay.setMap(map);
        });
      }).then(MapService.markersLoaded());
    };
    // $scope.getBestWavesFromCurrentLoc(10);
    // dummy
    $scope.renderMarkers();
  });
