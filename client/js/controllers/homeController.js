var home = angular.module('app.homeController', []);

home.controller('HomeController', function($rootScope, $scope, $modal, $timeout, $interval, $location, MapService, BestSpotService, AnimationService) {

  $scope.distance = 100;
  $scope.mapLoaded = false;
  $scope.animationFinished = false;
  $scope.counter = 10;
  $scope.sideMenu = false;
  $scope.bottomTab = false;

  $scope.getDirections = function () {
    BestSpotService.getBestWavesFromCurrentLoc($scope.distance, $scope.timeIndex);
  }

  $scope.toggleClass = function() {
    $scope.sideMenu = !$scope.sideMenu;
  }
  $scope.openSidebar = function() {
    $scope.sideMenu = true;
  }
  $scope.closeSidebar = function() {
    console.log('scope.sideMenu=', $scope.sideMenu)
    $scope.sideMenu = false;
    console.log('scope.sideMenu=', $scope.sideMenu)
  }

  $scope.toggleTab = function() {
    $scope.bottomTab = !$scope.bottomTab;
  }

  $scope.$on('map loaded', function() {
    var decrementCounter = $interval(function() {
      if (typeof $scope.counter === "string") {
        $scope.counter = 10;
      }
      if ($scope.counter > 1) {
        $scope.counter = $scope.counter - 1;
      } else {
        $scope.counter = "TEN";
        $interval.cancel(decrementCounter);
      }
      //Time between each tick
    }, 500);
    $timeout(function() {
      $scope.mapLoaded = true;
      $timeout(function() {
        $scope.animationFinished = true;
      }, 2000);
      //Time to remove overlay
    }, 5000);
  });

});
