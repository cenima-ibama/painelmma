'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:deterufs
 * @description
 * # deterufs
 */
angular.module('estatisticasApp')
  .directive('deterufs', function () {
    return {
      template: '<canvas class="chart-bar chart-stats" data="dataMensal" ' +
                'labels="labelsMensal" legend="true" series="seriesMensal" options="options"></canvas>',
      restrict: 'AE',
      link: function postLink(scope, element, attrs) {
        // scope.$on()
      }
    };
  });
