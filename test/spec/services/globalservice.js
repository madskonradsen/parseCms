'use strict';

describe('Service: GlobalService', function () {

  // load the service's module
  beforeEach(module('parseCmsApp'));

  // instantiate service
  var GlobalService;
  beforeEach(inject(function (_GlobalService_) {
    GlobalService = _GlobalService_;
  }));

  it('should do something', function () {
    expect(!!GlobalService).toBe(true);
  });

});
