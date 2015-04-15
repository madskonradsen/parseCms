'use strict';

/**
 * @ngdoc function
 * @name parseCmsApp.controller:ListitemsCtrl
 * @description
 * # ListitemsCtrl
 * Controller of the parseCmsApp
 */
angular.module('parseCmsApp')
  .controller('ListitemsCtrl', ['$scope', 'GlobalService', '$routeParams', 'entityData', 'entityInfo', function ($scope, GlobalService, $routeParams, entityData, entityInfo) {
  
    function getCurrentEntity(entityName) {
	  	for(var i = 0; i < entityInfo.data.entities.length; i++) {
	  		if(entityInfo.data.entities[i].name == entityName) return entityInfo.data.entities[i];
	  	}
	 }

    $scope.entityInfo = getCurrentEntity($routeParams.entityName)
    $scope.entityData = entityData;
}]);
