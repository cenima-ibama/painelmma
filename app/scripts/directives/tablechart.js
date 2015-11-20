'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:table
 * @description
 * # table
 */
angular.module('estatisticasApp')
  .directive('tableChart', function () {
    return {
      templateUrl: 'views/partials/tableChart.html',
      restrict: 'E',
      scope: {
        series: '=',
        labels: '=',
        data: '='
      },
      link: function postLink(scope, element, attrs) {
        // element.text('this is the table directive');
      }
    };
  });
