angular.module('app.mapService', [])
  .service('MapService', function($http, $rootScope) {

    var map;

    var getBeachData = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:1337/fetch'
      }).then(function (resp) {
        return resp.data;
      });
    };

    var markersLoaded = function() {
      $rootScope.$broadcast('map loaded');
    };

    var setMap = function(mapInstance) {
      map = mapInstance;
    };

    var getMap = function() {

      if (!map) {
        return null;
      }
      return map;
    };

    return {
      getBeachData: getBeachData,
      markersLoaded: markersLoaded,
      setMap: setMap,
      getMap: getMap
    };
  });
