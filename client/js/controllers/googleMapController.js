var map = angular.module('app.googleMapController', ["ngMap"]);

map.controller('GoogleMapController', function($scope, MapService) {
  console.log("beginning of controller??");
  var markers = [];
  $scope.getBeachData = function(){
    MapService.getBeachData()
      .then(function(result){
        $scope.beachData = result.data;
        // return result.data;
      })
  };
  // .then(function() {
  //     //TODO: Fill out what to do once beach data is obtained
  //     //TODO: Stop spinner
  //   // });
  $scope.getBeachData();
});
