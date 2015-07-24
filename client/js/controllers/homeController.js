var home = angular.module('app.homeController', []);


home.controller('HomeController', function($scope, $modal, $log, $timeout, $interval, MapService, BestSpotService, AnimationService) {

  $scope.distance = 100;
  $scope.timeIndex = 0;
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
    AnimationService.renderBeaches($scope.timeIndex);
    AnimationService.renderWind($scope.timeIndex);
  });

});
