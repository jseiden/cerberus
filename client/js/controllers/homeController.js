var home = angular.module('app.homeController', []);

home.controller('HomeController', function($scope, $modal) {
  $scope.animationsEnabled = true;

  $scope.open = function(size) {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'detailsModal.html',
      controller: 'DetailsController',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimations = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  }
});
