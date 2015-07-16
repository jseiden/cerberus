var home = angular.module('app.homeController', []);

home.controller('HomeController', function($scope, $modal, $log) {
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
  };

  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  }
});
