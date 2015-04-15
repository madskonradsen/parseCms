'use strict';

describe('Directive: parseMoGpsCell', function () {

  // load the directive's module
  beforeEach(module('parseCmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<parse-mo-gps-cell></parse-mo-gps-cell>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the parseMoGpsCell directive');
  }));
});
