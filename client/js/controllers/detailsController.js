var det = angular.module('app.detailsController', []);

det.controller('DetailsController', function($scope, $modalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items
  };
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
