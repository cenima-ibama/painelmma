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
      template: '<div resizable ng-style="{ height: windowHeight -60 }" id="mapa"></div>',
      restrict: 'E',
      link: function postLink(scope) {

      }
    };
  });
