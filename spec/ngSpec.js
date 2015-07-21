describe("DetailsController", function(){
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  var $scope = {};
  var $modalInstance = {};
  var forecast = {
    solidRating: 5,
    fadedRating: 5,
    swell: {
      components: {
        combined: {
          height: 10,
          period: 5
        }
      }
    },
    wind: {
      speed: 10,
      compassDirection: "NW"
    }
  };
  var beachName = 'Newport Beach';

  beforeEach(inject(function() {
    var controller = $controller('DetailsController', {
      $scope: $scope,
      $modalInstance: $modalInstance,
      forecast: forecast,
      beachName: beachName
    });
  }));

  describe("$scope.toRepeat", function() {

    it("returns an array", function() {
      expect(Array.isArray($scope.toRepeat())).toBe(true);
    });

    it("returns an array with length equal to the number passed in", function(){
      var num = 5
      expect($scope.toRepeat(num).length).toBe(num);
    });

  });

  describe("$scope.remainingStars", function() {

    it("returns a number", function() {
      expect(typeof $scope.remainingStars(2)).toBe('number');
    });
  });

});

describe("GoogleMapController", function(){
  var $controller;
  var $scope = {};

  beforeEach(module('app'));
  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));
  beforeEach(inject(function() {
    var controller = $controller('GoogleMapController', {
      $scope: $scope
    });
  }));

  describe("$scope.getBestWavesFromLoc", function() {

    it("should be a function", function() {
      expect(typeof $scope.getBestWavesFromLoc).toBe('function');
    });

    it("should return null if there are no beaches with the input distance")

  });

  describe("googlemapsmock", function () {
    var pos = new google.maps.LatLng(34.274646, -119.229032);
    expect(typeof pos).toBe('object');
  });

});
