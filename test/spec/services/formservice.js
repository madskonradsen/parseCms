'use strict';

describe('Service: FormService', function () {

  // load the service's module
  beforeEach(module('parseCmsApp'));

  // instantiate service
  var FormService;
  beforeEach(inject(function (_FormService_) {
    FormService = _FormService_;
  }));

  it('should do something', function () {
    expect(!!FormService).toBe(true);
  });

});
