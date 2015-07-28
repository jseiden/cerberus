var typeAhead = angular.module("app.typeAheadController", []);

typeAhead.controller("TypeAheadController", function($scope, $rootScope, MapService, $state) {
  $scope.searchBeach = undefined;
  $scope.beachChoices = [];
  // $scope.printBounds = MapService.printBounds;
  // $scope.zoomToBeach = MapService.zoomToBeach;
  var beachCache;

  $rootScope.$on('beachCacheSet', function() {
    beachCache = MapService.getBeachCache();
    beachCache.forEach(function(beach) {
      $scope.beachChoices.push(beach.beachname);
    });
  });

  $scope.printCache = function() {
    console.log("beachCache in TypeAheadController: ", beachCache);
  };

 $scope.printCurrentBeach = function(){
    console.log(MapService.getCurrentBeach());
  };

  $scope.onSubmit = function () {
    $state.go('details');
    MapService.setCurrentBeach($scope.searchBeach);
    MapService.zoomToBeach($scope.searchBeach);
    $scope.openSidebar();
  };

});

