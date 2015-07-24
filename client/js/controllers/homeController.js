var home = angular.module('app.homeController', []);


home.controller('HomeController', function($rootScope, $scope, $modal, $log, $timeout, $interval, MapService, BestSpotService, AnimationService) {

  $scope.distance = 100;
  $scope.timeIndex = 0;
  $scope.timeStamps;
  $scope.forecastTime; 

  $rootScope.$on('beachCacheSet', function() {
    var beaches = MapService.getBeachCache();
    $scope.timeStamps = $scope.getLocalTimeStamps(beaches);
  });

  $scope.getLocalTimeStamps = function (beaches) {
    var beach;
    // get the first beach that has forecast Data
    for (var i = 0; i < beaches.length; i++) {
      if (beaches[i].forecastData.length) {
        beach = beaches[i];
        break;
      }
    }
    return beach.forecastData.map(function (forecast) {
      var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      var date = new Date (forecast.localTimestamp * 1000);
      return date.toLocaleTimeString('en-us', options);
    });
  }

  $scope.mapLoaded = false;
  $scope.animationFinished = false;
  $scope.counter = 10;
  $scope.sideMenu = false;

  $scope.toggleClass = function() {
    $scope.sideMenu = !$scope.sideMenu;
  }

  $scope.$on('map loaded', function() {
    var decrementCounter = $interval(function() {
      if (typeof $scope.counter === "string") {
        $scope.counter = 10;
      }
      if ($scope.counter > 1) {
        $scope.counter = $scope.counter - 1;
      } else {
        $scope.counter = "";
        $interval.cancel(decrementCounter);
      }
    }, 1000);
    $timeout(function() {
      $scope.mapLoaded = true;
      $timeout(function() {
        $scope.animationFinished = true;
      }, 2000);
    }, 10000);
  });

  $scope.$on("slideEnded", function () {
    console.log('$scope.timeIndex=', $scope.timeIndex);
    // console.log('$scope.distance =', $scope.distance);
    // BestSpotService.getBestWavesFromCurrentLoc($scope.distance, $scope.timeIndex);
    $scope.forecastTime = $scope.timeStamps[$scope.timeIndex];
    AnimationService.renderWind($scope.timeIndex);
    AnimationService.renderBeaches($scope.timeIndex);
  });

});
