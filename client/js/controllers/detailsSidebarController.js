var sideBar = angular.module('app.detailsSidebarController', []);

sideBar.controller('DetailsSidebarController', function($rootScope, $scope, MapService, AnimationService) {
  // $scope.forecastTime = "test"
  $scope.timeIndex = 0;
  $scope.selectedBeach = MapService.getCurrentBeach();
  console.log('scope.selectedBeach', $scope.selectedBeach);
  // $scope.forecastTime;
  // $scope.timeStamps;
  var beaches = MapService.getBeachCache();
  $scope.timeStamps = MapService.getLocalTimeStamps(beaches);
  $scope.forecastTime = $scope.timeStamps[$scope.timeIndex];
  console.log('DetailsSidebarController fired')

  // $scope.$on('beachCacheSet', function() {
  //   console.log('DetailsSidebarController heard beachCacheSet');
  //   var beaches = MapService.getBeachCache();
  //   $scope.timeStamps = MapService.getLocalTimeStamps(beaches);
  //   $scope.forecastTime = $scope.timeStamps[$scope.timeIndex];
  //   console.log($scope.timeStamps);
  //   console.log('forecastTime=', $scope.forecastTime);
  // });

  $scope.$on("slideEnded", function () {
    console.log('$scope.timeIndex=', $scope.timeIndex);
    // var beaches = MapService.getBeachCache();
    // $scope.timeStamps = MapService.getLocalTimeStamps(beaches);
    $scope.forecastTime = $scope.timeStamps[$scope.timeIndex];
    AnimationService.renderWind($scope.timeIndex);
    AnimationService.renderBeaches($scope.timeIndex);
  });

});
