'use strict';

/**
 * @ngdoc function
 * @name parseCmsApp.controller:AdditemCtrl
 * @description
 * # AdditemCtrl
 * Controller of the parseCmsApp
 */
angular.module('parseCmsApp')
  .controller('AdditemCtrl', ['$scope', 'GlobalService', '$routeParams', 'entityInfo', 'FormService', function ($scope, GlobalService, $routeParams, entityInfo, FormService) {
  	function getCurrentEntity(entityName) {
  	  	for(var i = 0; i < entityInfo.data.entities.length; i++) {
  	 		if(entityInfo.data.entities[i].name == entityName) return entityInfo.data.entities[i];
  	 	}
  	}

  	FormService = {};

  	$scope.entityInfo = getCurrentEntity($routeParams.entityName)
  }]);
