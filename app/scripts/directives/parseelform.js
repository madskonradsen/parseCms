'use strict';

/**
 * @ngdoc directive
 * @name parseCmsApp.directive:parseElForm
 * @description
 * # parseElForm
 */
angular.module('parseCmsApp')
  .directive('parseElForm', ['$compile', 'FormService', 'DataService', '$routeParams', '$location' ,function($compile, FormService, DataService, $routeParams, $location) {
    return {
      restrict: 'EA',
      priority: 1000,
      replace: false,
      scope: {
        entityData: '=',
        entityInfo: '='
      },
      controller: function($scope, $element){

        //Submit form
        $scope.submit = function() {
          if($scope.entityData) {
            DataService.updateItem(FormService, $routeParams.entityName, $routeParams.id).then(function() {
              $location.path("/"+$routeParams.entityName);
            });
          } else {
            DataService.saveItem(FormService, $routeParams.entityName).then(function() {
              $location.path("/"+$routeParams.entityName);
            });
          }
        };

      },
      link: function postLink(scope, iElement, attrs) {
        iElement.removeAttr("parse-el-form");
        
        //Creating the form
        var form = document.createElement("form");
        form.setAttribute("class","form-horizontal");
        form.setAttribute("ng-submit","submit()");
        form.setAttribute("role","form");
        //Appending the form to the iElement
        angular.element(iElement.append(form));

        //For every subEntity generate markup
        scope.entityInfo.subEntities.forEach(function(subEntity) {

          var subEntityData = "";

          //If entityData has data, handle the data
          if(scope.entityData) {
            if(typeof scope.entityData.attributes[subEntity.name] === "object") {
              subEntityData = btoa(JSON.stringify(scope.entityData.attributes[subEntity.name]));
            } else if (scope.entityData.attributes[subEntity.name] === undefined) {
              //Append nothing aka empty cell
            } else {
              subEntityData = scope.entityData.attributes[subEntity.name];
            }
          }

          //Markup for the subEntity
          var item = 
          "<div class='form-group'>" +
            "<label class='col-sm-2 control-label'>" + subEntity.text + "</label>" +
            "<div class='col-sm-10' parse-mo-" + subEntity.type + " sub-entity-data='"+subEntityData+"' sub-entity='" + btoa(JSON.stringify(subEntity)) + "'>" + 
            "</div>" +
          "</div>";

          //Add row to iElement
          angular.element(iElement.find("form").append(item));
        });

        //Generate markup for the submitButton
        var submitButton =           
        "<div class='form-group'>" +
            "<div class='col-sm-offset-2 col-sm-10'>";
        //If there is data, then we are in edit-mode, otherwise, we are adding new data
        if(scope.entityData) {
          submitButton += "<button type='submit' class='btn btn-success'>Update</button>";
        } else {
          submitButton += "<button type='submit' class='btn btn-success'>Add</button>";
        }
        submitButton +=             
            "</div>" +
        "</div>";

        angular.element(iElement.find("form").append(submitButton));


        //Compile iElement
        $compile(iElement)(scope);
      
      }
    };
  }]);