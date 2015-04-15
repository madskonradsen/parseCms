'use strict';

/**
 * @ngdoc overview
 * @name parseCmsApp
 * @description
 * # parseCmsApp
 *
 * Main module of the application.
 */
angular
  .module('parseCmsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'parse-angular',
    'wu.staticGmap',
    'AngularGM',
    'ngProgressLite'
  ])
  .run(['$rootScope', 'ngProgressLite', function($root, ngProgressLite) {

    $root.$on('$routeChangeStart', function(e, curr, prev) {
      if (curr.$$route && curr.$$route.resolve) {
        // Show a loading message until promises are resolved
        ngProgressLite.start();
      }
    });
    $root.$on('$routeChangeSuccess', function(e, curr, prev) { 
      // Hide loading message
      ngProgressLite.done();
    });

  }])
  .constant("PARSE_CONFIG", {
      "appId": "BKVCJNvXStolRs553Ct14FPcnCeMLdxrLaVLqSaB",
      "jsId": "9GumHrnjtsIXPpCaiKsPwZLILQfIWtNHLGd8Wv1F"
  })
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/:entityName', {
        templateUrl: 'views/listitems.html',
        controller: 'ListitemsCtrl',
        resolve: {
          entityInfo: ['$route', 'GlobalService', function($route, GlobalService) {
            return GlobalService.projectJson($route.current.params.entityName);
          }],
          entityData: ['$route', 'DataService', function($route, DataService) {
            return DataService.getEntityData($route.current.params.entityName);
          }]
        }
      })
      .when('/:entityName/add', {
        templateUrl: 'views/additem.html',
        controller: 'AdditemCtrl',
        resolve: {
          entityInfo: ['$route', 'GlobalService', function($route, GlobalService) {
            return GlobalService.projectJson($route.current.params.entityName);
          }]
        }
      })
      .when('/:entityName/edit/:id', {
        templateUrl: 'views/edititem.html',
        controller: 'EdititemCtrl',
        resolve: {
          entityInfo: ['$route', 'GlobalService', function($route, GlobalService) {
            return GlobalService.projectJson($route.current.params.entityName);
          }],
          entityData: ['$route', 'DataService', function($route, DataService) {
            return DataService.getItem($route.current.params.id, $route.current.params.entityName);
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);