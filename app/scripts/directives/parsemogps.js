'use strict';
/**
 * @ngdoc directive
 * @name parseCmsApp.directive:parseMoGps
 * @description
 * # parseMoGps
 */
angular.module('parseCmsApp')
  .directive('parseMoGps', ['$compile', 'FormService', function ($compile, FormService) {
    return {
      scope: {
        subEntity: "@",
        subEntityData: "@"
      },
      restrict: 'EA',
      controller: function($scope, $element) {
        //We decode our base64 data
        var subEntityObject = JSON.parse(atob($scope.subEntity));
        var subEntityDataObject = ($scope.subEntityData) ? JSON.parse(atob($scope.subEntityData)) : null;

        //We set initial markers
        $scope.parseMoGpsMarkers = [{
            id: 0,
            lat: "56.150000",
            lng: "10.200000"
        }];
        
        //We set initial mapOptions
        $scope.parseMoGpsOptions = {
          map: {
            center: new google.maps.LatLng($scope.parseMoGpsMarkers[0].lat, $scope.parseMoGpsMarkers[0].lng),
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          },
          marker: function(marker) {
            return {
              clickable: false,
              draggable: true,
            }
          }
        };

        //If we have some data, use that instead
        if($scope.subEntityData) {
          $scope.parseMoGpsMarkers = [{
            id: 0,
            lat:subEntityDataObject.lat,
            lng:subEntityDataObject.lng
          }];

          $scope.parseMoGpsOptions.map = {
            center: new google.maps.LatLng(subEntityDataObject.lat, subEntityDataObject.lng),
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.ROADMAP      
          }
        }

        //When marker is dropped
        $scope.setMarkerLocation = function(markerObject, marker) {
          var position = marker.getPosition();
          markerObject.lat = position.lat();
          markerObject.lng = position.lng();
        };

        //Write the markers to our FormService
        FormService[subEntityObject.name] = $scope.parseMoGpsMarkers[0];

      },
      link: function postLink(scope, element, attrs) {
      	element.removeAttr("parse-mo-gps")

        //Generating markup for the map
        var formString =
        "<p><input type='text' placeholder='Latitude...' ng-model='parseMoGpsMarkers[0].lat' class='form-control' style='width:40%;display:inline-block;'> " +
        "<input type='text' placeholder='Langtitude...' ng-model='parseMoGpsMarkers[0].lng' class='form-control' style='width:40%;display:inline-block;'></p>" +
        "<input type='hidden' ng-model='parseMoGpsMarkers'>";
        element.html(formString);

        element.append("<gm-map gm-map-id=\"'gpsMap'\" gm-center='center' gm-zoom='zoom' gm-map-options='parseMoGpsOptions.map' class='map'>" +
                          "<gm-markers gm-objects='parseMoGpsMarkers' gm-id='object.id' gm-position='{lat: object.lat, lng: object.lng}' gm-marker-options='parseMoGpsOptions.marker(object)' gm-on-dragend='setMarkerLocation(object, marker)'></gm-markers>" +
                       "</gm-map>");
        
        //Compiling the markup
        $compile(element)(scope);
      }
    };
  }]);