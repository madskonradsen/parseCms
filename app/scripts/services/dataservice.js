'use strict';
/*global Parse:false */

/**
 * @ngdoc service
 * @name parseCmsApp.DataService
 * @description
 * # DataService
 * Factory in the parseCmsApp.
 */
angular.module('parseCmsApp')
  .factory('DataService', ['GlobalService', 'PARSE_CONFIG', function (GlobalService, PARSE_CONFIG) {
    Parse.initialize(PARSE_CONFIG.appId, PARSE_CONFIG.jsId);

    return {
      getEntityData: function(entityName) {
        return GlobalService.projectJson().then(function(result) {
            var Entity = Parse.Object.extend(result.data.login + '_' + entityName);
            var query = new Parse.Query(Entity);
            query.descending('createdAt');
            return query.find();
        });
      },

      getItem: function(id, entityName) {
        return GlobalService.projectJson().then(function(result) {
            var Entity = Parse.Object.extend(result.data.login + '_' + entityName);
            var query = new Parse.Query(Entity);
            return query.get(id);
        });
      },

      deleteItem: function(id, entityName) {
        return GlobalService.projectJson().then(function(result) {
            var Entity = Parse.Object(result.data.login + '_' + entityName);
            Entity.id = id;
            return Entity.destroy();
        });
      },

      saveItem: function(formService, entityName) {
        return GlobalService.projectJson().then(function(result) {
            var Entity = Parse.Object.extend(result.data.login + '_' + entityName);
            var newItem = new Entity();
            return newItem.save(formService);
        });
      },

      updateItem: function(formService, entityName, id) {
        return GlobalService.projectJson().then(function(result) {
            var Entity = Parse.Object.extend(result.data.login + '_' + entityName);
            var item = new Entity();
            item.id = id;

            for(var key in formService) {
              item.set(key, formService[key]);
            }

            return item.save();
        });
      },

      saveFile: function(file) {
        var fileUploadControl = file;
        if (fileUploadControl.files.length > 0) {
          file = fileUploadControl.files[0];
          var name = 'photo.jpg';
              
          var parseFile = new Parse.File(name, file);
          return parseFile.save();
        }
      }
    };
  }]);
