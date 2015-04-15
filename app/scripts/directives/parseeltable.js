'use strict';

/**
 * @ngdoc directive
 * @name parseCmsApp.directive:parseElTable
 * @description
 * # parseElTable
 */
angular.module('parseCmsApp')
  .directive('parseElTable', ['$compile', 'DataService', '$routeParams', function ($compile, DataService, $routeParams) {
    return {
      templateUrl: 'views/parseeltable.html',
      restrict: 'EA',
      priority: 1000,
      replace: false,
      scope: {
        entityData: '=',
        entityInfo: '='
      },
      controller: function($scope, $element){

        $scope.delete = function(id) {
          if(confirm("Are you sure you wanna delete this item?")) {
            $("tr[data-id='"+id+"'").remove();
            DataService.deleteItem(id, $routeParams.entityName);
          }
        };
        
      },
      link: function postLink(scope, iElement, attrs) {
        iElement.removeAttr("parse-el-table");

        //For each row in entity
        scope.entityData.forEach(function(entity) {
          //Create the row-node
          var tr = document.createElement("tr");
          tr.setAttribute("data-id", entity.id);

          //For each field in projectJson
          scope.entityInfo.subEntities.forEach(function(info) {
            //Create the cell-node
            var td = document.createElement("td");
            //Get the cell-value from our database
            var subEntityValue = entity.attributes[info.name];
            
            //If the cell contains an object, convert to base64
            if(typeof subEntityValue === "object") {
              td.appendChild(document.createTextNode(btoa(JSON.stringify(subEntityValue))));
            } else if (subEntityValue === undefined) {
              //Append nothing aka empty cell
            } else {
              td.appendChild(document.createTextNode(subEntityValue));
            }

            //Apply attribute to each cell, containing the directive-name
            td.setAttribute("parse-mo-" + info.type + "-cell", "");
            
            //Add cell to row
            tr.appendChild(td);

          });
          //Add buttons to each row
          var td = document.createElement("td");
          td.innerHTML = "<td><a href='#/" + scope.entityInfo.name + "/edit/" + entity.id + "' class='btn-action btn btn-primary'><span class='glyphicon glyphicon-edit'></span></a> <a ng-click='delete(\""+entity.id+"\")' class='btn-action btn btn-danger'><span class='glyphicon glyphicon-trash'></span></a></td>";
          tr.appendChild(td);

          //Add row to iElement
          angular.element(iElement.find("table").append(tr))
        });
        //Compile iElement
        $compile(iElement)(scope);
      }
    };
  }]);