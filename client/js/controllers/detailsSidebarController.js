var sideBar = angular.module('app.detailsSidebarController', []);

sideBar.controller('DetailsSidebarController', function($timeout, $rootScope, $scope, MapService, AnimationService, BestSpotService) {

  $scope.init = function() {
    var beaches = MapService.getBeachCache();
    $scope.timeIndex = 0;
    $scope.selectedBeach = MapService.getCurrentBeach();
    $scope.timeStamps = MapService.getLocalTimeStamps(beaches);
    $scope.forecastTime = $scope.timeStamps[$scope.timeIndex];
    $scope.currentForecast = $scope.selectedBeach.forecastData[$scope.timeIndex];
    $scope.fadedRating = $scope.currentForecast.fadedRating;
    $scope.solidRating = $scope.currentForecast.solidRating;
    $scope.detailsTab = false;
  };

  // $scope.init()

  $scope.updateForecast = function() {
    $scope.currentForecast = $scope.selectedBeach.forecastData[$scope.timeIndex];
    $scope.fadedRating = $scope.currentForecast.fadedRating;
    $scope.solidRating = $scope.currentForecast.solidRating;
    console.log($scope.currentForecast);
  }

  $scope.toRepeat = function(num) {
    var results = [];
    for (var i = 0; i < num; i++) {
      results.push(i);
    }
    return results;
  }

  $scope.remainingStars = function() {
    return 5 - $scope.fadedRating - $scope.solidRating;
  }

  if (MapService.getBeachCache()) {
    $scope.init();
  }

  $scope.$on('beachCacheSet', function() {
    $scope.init();
  });

  $scope.toggleTab = function() {
    $scope.detailsTab = !$scope.detailsTab;
  };

  $scope.$on('slideEnded', function() {
    $scope.forecastTime = $scope.timeStamps[$scope.timeIndex];
    MapService.setCurrentTimeStamp($scope.timeIndex);
    AnimationService.renderWind($scope.timeIndex);
    AnimationService.renderBeaches($scope.timeIndex);
    $scope.updateForecast();
    $timeout(function(){
      AnimationService.highlightMarker();
    }, 100);
  });

  $scope.$on('beach selected', function() {
    $scope.selectedBeach = MapService.getCurrentBeach();
    $scope.updateForecast();
  });

  $scope.getDirections = function() {
    BestSpotService.renderPathToBeachFromCurrentLocation($scope.selectedBeach);
  };



});
