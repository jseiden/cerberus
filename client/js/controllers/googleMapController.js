var map = angular.module('app.googleMapController', ["ngMap"]);

map.controller('GoogleMapController', function($scope, MapService) {
  $scope.getBeachData = function() {
    MapService.getBeachData()
     .then(function(result){
       console.log(result.data);
     })
    // .then(function() {
      //TODO: Fill out what to do once beach data is obtained
      //TODO: Stop spinner
    // });
  };
  $scope.getBeachData();
});
