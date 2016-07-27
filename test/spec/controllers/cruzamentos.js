'use strict';

describe('Controller: CruzamentosCtrl', function () {

  // load the controller's module
  beforeEach(module('estatisticasApp'));

  var CruzamentosCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    CruzamentosCtrl = $controller('CruzamentosCtrl', {
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CruzamentosCtrl.awesomeThings.length).toBe(3);
  });
});
