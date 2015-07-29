var tab = angular.module('app.detailsTabController', [])

tab.controller = angular.controller('DetailsTabController', function($scope, MapService) {
  $scope.theBeach = MapService.getCurrentBeach();
});
