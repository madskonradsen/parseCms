'use strict';

/**
 * @ngdoc service
 * @name parseCmsApp.GlobalService
 * @description
 * # GlobalService
 * Factory in the parseCmsApp.
 */
angular.module('parseCmsApp')
  .factory('GlobalService', ['$http', function ($http) {

    return {
      projectJson: function () {
        return $http({url:'./project.json', method: 'GET', cache: true});
      }

    };
  }]);
