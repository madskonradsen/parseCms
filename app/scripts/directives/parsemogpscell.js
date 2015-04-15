'use strict';

/**
 * @ngdoc directive
 * @name parseCmsApp.directive:parseMoGpsCell
 * @description
 * # parseMoGpsCell
 */
angular.module('parseCmsApp')
  .directive('parseMoGpsCell', ['$compile', function ($compile) {
    return {
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
      	element.removeAttr("parse-mo-gps-cell")

        var gpsObject = JSON.parse(atob(element.text()));
        element.html("<a target='_blank' href='http://google.com/maps/dir/"+(gpsObject.lat*1)+","+(gpsObject.lng*1)+"/data=!4m3!4m2!1m0!1m0'><static-gmap size='150x100' sensor='false' zoom='14' markers='{ color: \"red\", label: \"o\", coords: ["+(gpsObject.lat*1)+", "+(gpsObject.lng*1)+"] }'></static-gmap></a>");

        $compile(element)(scope);
      }
    };
  }]);
