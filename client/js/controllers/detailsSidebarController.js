var sideBar = angular.module('app.detailsSidebarController', []);

sideBar.controller('DetailsSidebarController', function($timeout, $rootScope, $scope, MapService, AnimationService, BestSpotService, $location) {
  $scope.init = function() {
    $scope.timeIndex = 0;
    MapService.setCurrentTimeStamp($scope.timeIndex);
    // MapService.updateBeachInfo($scope.timeIndex);
    $scope.beachInfo = MapService.beachInfo;
    console.log($scope.beachInfo);
    // var beaches = MapService.getBeachCache();
    // $scope.selectedBeach = MapService.getCurrentBeach();
    // $scope.timeStamps = MapService.getLocalTimeStamps(beaches);
    // $scope.forecastTime = $scope.timeStamps[$scope.timeIndex];
    // $scope.currentForecast = $scope.selectedBeach.forecastData[$scope.timeIndex];
    // $scope.fadedRating = $scope.currentForecast.fadedRating;
    // $scope.solidRating = $scope.currentForecast.solidRating;
    // $scope.beachname = $scope.selectedBeach.beachname;
    // $scope.detailsTab = false;
  };
  $scope.init();

  $scope.$on('slideEnded', function() {
    // MapService.updateBeachInfo($scope.timeIndex);
    MapService.setCurrentTimeStamp($scope.timeIndex);
    AnimationService.renderWind($scope.timeIndex);
    AnimationService.renderBeaches($scope.timeIndex);
    $timeout(function(){
      AnimationService.highlightMarker();
    }, 100);
    console.log("currentForecast in controller ", $scope.beachInfo);
    // $scope.forecastTime = $scope.timeStamps[$scope.timeIndex];
    // $scope.updateForecast();
  });

  // $rootScope.$on('$locationChangeStart', function() {
  //   if ($location.url() === "/") {
  //     MapService.setCurrentTimeStamp(0);
  //   }
  // })

  // $scope.updateForecast = function() {
  //   $scope.selectedBeach = MapService.getCurrentBeach();
  //   $scope.currentForecast = $scope.selectedBeach.forecastData[$scope.timeIndex];
  //   $scope.beachname = $scope.selectedBeach.beachname;
  //   $scope.fadedRating = $scope.currentForecast.fadedRating;
  //   $scope.solidRating = $scope.currentForecast.solidRating;
  // }

  $scope.toRepeat = function(num) {
    var results = [];
    for (var i = 0; i < num; i++) {
      results.push(i);
    }
    return results;
  }

  $scope.remainingStars = function() {
    return 5 - $scope.beachInfo.forecast.fadedRating - $scope.beachInfo.forecast.solidRating;
  }
  //
  // if (MapService.getBeachCache()) {
  //   $scope.init();
  // }

  // $scope.$on('beachCacheSet', function() {
  //   $scope.init();
  // });

  $scope.toggleTab = function() {
    $scope.detailsTab = !$scope.detailsTab;
  };



  // $scope.$on('beach selected', function() {
  //   $scope.$apply($scope.updateForecast());
  // });

  $scope.getDirections = function() {
    BestSpotService.renderPathToBeachFromCurrentLocation($scope.selectedBeach);
  };



});
