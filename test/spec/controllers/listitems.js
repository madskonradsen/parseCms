'use strict';

describe('Controller: ListitemsCtrl', function () {

  // load the controller's module
  beforeEach(module('parseCmsApp'));

  var ListitemsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListitemsCtrl = $controller('ListitemsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
