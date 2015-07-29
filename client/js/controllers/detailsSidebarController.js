var sideBar = angular.module('app.detailsSidebarController', []);

sideBar.controller('DetailsSidebarController', function($rootScope, $scope, MapService, AnimationService) {

  var beaches = MapService.getBeachCache();
  $scope.timeIndex = 0;
  $scope.selectedBeach = MapService.getCurrentBeach();
  $scope.timeStamps = MapService.getLocalTimeStamps(beaches);
  $scope.forecastTime = $scope.timeStamps[$scope.timeIndex];

  $scope.detailsTab = false;

  $scope.toggleTab = function() {
    $scope.detailsTab = !$scope.detailsTab;
  };

  $scope.$on("slideEnded", function () {
    $scope.forecastTime = $scope.timeStamps[$scope.timeIndex];
    AnimationService.renderWind($scope.timeIndex);
    AnimationService.renderBeaches($scope.timeIndex);
  });

  $scope.$on('beach selected', function() {
    $scope.selectedBeach = MapService.getCurrentBeach();
  });

});
