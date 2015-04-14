'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:prodesuf
 * @description
 * # prodesuf
 */
angular.module('estatisticasApp')
  .directive('prodesuf', function () {
    return {
		template: '<canvas class="chart-bar chart-stats" data="dataProdes" ' +
		'labels="labelsProdes" legend="true" series="seriesProdes" options="options"></canvas>',
		restrict: 'AE',
		link: function postLink(scope, element, attrs) {
			// scope.$on('load_public_prodes')
		}
    };
  });
