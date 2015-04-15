'use strict';

/**
 * @ngdoc function
 * @name parseCmsApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the parseCmsApp
 */
angular.module('parseCmsApp')
  .controller('SidebarCtrl', ['$scope', 'GlobalService', function ($scope, GlobalService) {
    GlobalService.projectJson().success(function(projectJson) {
	    $scope.projectJson = projectJson;
    });
  }]);
