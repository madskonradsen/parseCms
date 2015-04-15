'use strict';

describe('Directive: parseMoImageCell', function () {

  // load the directive's module
  beforeEach(module('parseCmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<parse-mo-image-cell></parse-mo-image-cell>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the parseMoImageCell directive');
  }));
});
