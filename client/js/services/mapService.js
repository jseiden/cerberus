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
      beachCache = beachObj;
      $rootScope.$broadcast("beachCacheSet");
    };

    var getBeachCache = function(){
      return beachCache;
    };

    var zoomToBeach = function(beach){
      var targetCoordinates = {};
      var zoomMap = getMap();
      for(var i = 0; i < beachCache.length; i++){
        if(beachCache[i].beachname === beach){
          targetCoordinates.lat = beachCache[i].lat;
          targetCoordinates.lng = beachCache[i].lon;
        }
      }

      // zoomMap.center = targetCoordinates;
      // console.log("new map: ", zoomMap);
      // setMap(zoomMap);
      // console.log(zoomMap.getCenter());
      // console.log("bounds: ", map.getBounds());

      map.setCenter(targetCoordinates);
      map.setZoom(11);
      // map.setCenter({lat: -34.397, lng: 150.644});
      console.log(map);

    };

    var printBounds = function(){
      console.log(map.getBounds());
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
