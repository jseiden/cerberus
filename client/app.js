var app = angularModule('app', [
  'app.homeController',
  'app.mapController',
  'app.mapService'
])
.config(function($urlRouterProvider, $stateProvider) {
  urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '..index.html',
    controller: 'HomeController'
  });
})
;
