'use strict';

describe('Service: restFunctions', function () {

  // load the service's module
  beforeEach(module('estatisticasApp'));

  // instantiate service
  var restFunctions;
  beforeEach(inject(function (_restFunctions_) {
    restFunctions = _restFunctions_;
  }));

  it('should do something', function () {
    expect(!!restFunctions).toBe(true);
  });

});
