angular.module('app.googleMapController', [])
  .controller('GoogleMapController', function($scope, $rootScope, MapService, AnimationService) {

    $scope.init = function () {
      var map = new google.maps.Map(document.getElementById( 'map' ), {
        zoom: 6,
        minZoom: 6,
        center: new google.maps.LatLng(36.958, -119.2658)
      });

      MapService.setMap( map );
      MapService.getBeachData()
        .then(function ( beaches ) {
          MapService.setBeachCache( beaches );
        });
    };

    $rootScope.$on('beachCacheSet', function () {
      AnimationService.renderBeaches();
      AnimationService.renderWind();
    });

    $scope.init();

  });
