'use strict';

/**
 * @ngdoc directive
 * @name parseCmsApp.directive:parseMoImage
 * @description
 * # parseMoImage
 */
angular.module('parseCmsApp')
  .directive('parseMoImage', ['$compile', 'FormService', 'DataService', function ($compile, FormService, DataService) {
    return {
      restrict: 'EA',
      scope: {
        subEntity: "@",
        subEntityData: "@"
      },
      controller: function($scope, $element) {
        //We decode our base64 data
        var subEntityObject = JSON.parse(atob($scope.subEntity));
        var subEntityDataObject = ($scope.subEntityData) ? JSON.parse(atob($scope.subEntityData)) : null;

        //When a file is selected
        var inputHandle = "#"+subEntityObject.name+"_input";
        jQuery("body").on('change', inputHandle, function() {
          function readURL(input) {
              if (input.files && input.files[0]) {
                  var reader = new FileReader();

                  //We read the file, and shows it on screen
                  reader.onload = function (e) {
                      $("#"+subEntityObject.name+"_image").attr('src', e.target.result);
                  }

                  reader.readAsDataURL(input.files[0]);
              }
          }

          readURL(this);

          //Save the file in our field
          DataService.saveFile($("#"+subEntityObject.name+"_input")[0]).then(function(data){
            FormService[subEntityObject.name] = data;
          });
        })

      },
      link: function postLink(scope, element, attrs) {
        var subEntityObject = JSON.parse(atob(scope.subEntity));
        var subEntityDataObject = (scope.subEntityData) ? JSON.parse(atob(scope.subEntityData)) : null;

        element.removeAttr("parse-mo-image");

        //If we have data beforehand, show that, otherwise don't
        if(scope.subEntityData) {
          element.html("<input type='file' id='"+subEntityObject.name+"_input' ng-model='image_input' />" +
                       "<img id='"+subEntityObject.name+"_image' src='"+subEntityDataObject._url+"' style='height:75px;margin:20px 0;' />");
        } else {
          element.html("<input type='file' id='"+subEntityObject.name+"_input' ng-model='image_input' />" +
                       "<img id='"+subEntityObject.name+"_image' src='' style='height:75px;margin:20px 0;' />");
        }

        $compile(element)(scope);
      }
    };
  }]);