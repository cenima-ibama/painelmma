'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:spinner
 * @description
 * # spinner
 */
angular.module('estatisticasApp')
  .directive('spinner', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	var spinner = new Spinner().spin();

      	element[0].appendChild(spinner.el);
      }
    };
  });
