'use strict';

/**
 * @ngdoc directive
 * @name parseCmsApp.directive:parseMoImageCell
 * @description
 * # parseMoImageCell
 */
angular.module('parseCmsApp')
  .directive('parseMoImageCell', ['$compile', function ($compile) {
    return {
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        element.removeAttr("parse-mo-image-cell")

        if(element.text() == "") {
        	element.html("<i>No picture selected</i>");
        } else {
          var imageObject = JSON.parse(atob(element.text()));
        	element.html("<a href='"+imageObject._url+"' target='_blank'><img src='"+imageObject._url+"' class='img-responsive' style=            'height:100px;'></a>");
        }

        $compile(element)(scope);
      }
    };
  }]);
