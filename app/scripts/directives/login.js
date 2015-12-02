'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:login
 * @description
 * # login
 */
angular.module('estatisticasApp')
  .directive('login', function () {
    return {
      templateUrl: 'views/partials/login.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
