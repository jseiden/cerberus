var typeAhead = angular.module("app.typeAheadController", []);

typeAhead.controller("TypeAheadController", function($scope, $rootScope, MapService, $state, AnimationService) {
  $scope.searchBeach = undefined;
  $scope.beachChoices = [];
  var beachCache;

  $rootScope.$on('beachCacheSet', function() {
    beachCache = MapService.getBeachCache();
    beachCache.forEach(function(beach) {
      $scope.beachChoices.push(beach.beachname);
    });
  });

  $scope.onSubmit = function () {
    $state.go('details');
    MapService.setCurrentBeach($scope.searchBeach);
    MapService.zoomToBeach($scope.searchBeach);
    $scope.openSidebar();
    AnimationService.highlightMarker();
  };

});
