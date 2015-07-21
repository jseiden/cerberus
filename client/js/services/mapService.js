angular.module('app.mapService', [])
  .service('MapService', function($http, $rootScope) {

    var map;
    var beachCache;

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

    // setting beachCache for ready access without extra ajax calls
    var setBeachCache = function(beachObj){
      console.log("argument to setBeachCache: ", beachObj);
      beachCache = beachObj;
      console.log("beachCache set to: ", beachCache);
      $rootScope.$broadcast("beachCacheSet");
    };

    var getBeachCache = function(){
      console.log("getBeachCache fired");
      // if(!beachCache) {
      //   return null
      // }
      console.log("beachCache in getBeachCache: ", beachCache);
      return beachCache;
    };

    var zoomToBeach = function(beach){
      console.log("zoomToBeach fired with ", beach);
    };

    return {
      getBeachData: getBeachData,
      markersLoaded: markersLoaded,
      setMap: setMap,
      getMap: getMap,
      setBeachCache: setBeachCache,
      getBeachCache: getBeachCache,
      zoomToBeach: zoomToBeach
    };
  });
