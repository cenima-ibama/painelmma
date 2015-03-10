'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:map
 * @description
 * # map
 */
angular.module('estatisticasApp')
  .directive('map', function () {
    return {
      template: '<div resizable ng-style="{ width: windowWidth, height: windowHeight - 60}" id="map"></div>',
      restrict: 'E'
    };
  });
