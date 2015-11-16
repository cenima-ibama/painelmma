'use strict';

describe('Service: restResults', function () {

  // load the service's module
  beforeEach(module('estatisticasApp'));

  // instantiate service
  var restResults;
  beforeEach(inject(function (_restResults_) {
    restResults = _restResults_;
  }));

  it('should do something', function () {
    expect(!!restResults).toBe(true);
  });

});
