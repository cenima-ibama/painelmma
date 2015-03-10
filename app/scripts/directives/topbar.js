'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:topbar
 * @description
 * # topbar
 */
angular.module('estatisticasApp')
  .directive('topbar', function () {
    return {
    	 templateUrl: "views/topbar.html"
    };
  });
