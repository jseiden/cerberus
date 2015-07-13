var app = angular.module('app', [
  'app.homeController',
  'app.mapController',
  'app.mapService',
  'ui.router',
  // this module is for angular-google.maps
  'uiGmapgoogle-maps'
])
.config(function($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '../html/index.html',
    controller: 'HomeController'
  });
});
