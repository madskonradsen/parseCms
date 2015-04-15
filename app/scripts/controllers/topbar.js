'use strict';

/**
 * @ngdoc function
 * @name parseCmsApp.controller:TopbarCtrl
 * @description
 * # TopbarCtrl
 * Controller of the parseCmsApp
 */
angular.module('parseCmsApp')
  .controller('TopbarCtrl', ['$scope', 'GlobalService', function ($scope, GlobalService) {
    GlobalService.projectJson().success(function(projectJson) {
	    $scope.projectJson = projectJson;
    });
  }]);
