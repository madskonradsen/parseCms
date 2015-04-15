'use strict';

/**
 * @ngdoc directive
 * @name parseCmsApp.directive:parseMoNumber
 * @description
 * # parseMoNumber
 */
angular.module('parseCmsApp')
  .directive('parseMoNumber', ['$compile', 'FormService', function ($compile, FormService) {
    return {
      restrict: 'EA',
      scope: {
        subEntity: "@",
        subEntityData: "@"
      },
      controller: function($scope, $element) {
        //We create af reference to the subEntity, which we receives as base64
      	var subEntityObject = JSON.parse(atob($scope.subEntity));
      	$scope.parseMoNumber;

        //If we have some data, insert it into the field
        if($scope.subEntityData) {
          $scope.parseMoNumber = parseFloat($scope.subEntityData);
        }

        //We watch for changes in the field, and on change, we insert it into our FormService
      	$scope.$watch("parseMoNumber", function(newValue, oldValue) {
      		FormService[subEntityObject.name] = newValue;
      	});

      },
      link: function postLink(scope, element, attrs) {
        element.removeAttr("parse-mo-number");

        var subEntityObject = JSON.parse(atob(scope.subEntity));

        //Generating markup for the field
        var input = document.createElement("input");
        input.setAttribute("type","number");
        input.setAttribute("step","any");
        input.setAttribute("class","form-control");
        input.setAttribute("placeholder",subEntityObject.text+"...");
        input.setAttribute("ng-model","parseMoNumber");
        if(subEntityObject.instanceMin >= 1) {
        	input.setAttribute("required","")
        }

        element.html(input);

        //Compiling the markup
        $compile(element)(scope);
      }
    };
  }]);