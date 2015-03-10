'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:resizable
 * @description
 * # resizable
 */
angular.module('estatisticasApp')
  .directive('resizable', function($window) {
	return function($scope) {
      $scope.initializeWindowSize = function() {
        $scope.windowHeight = $window.innerHeight;
        return $scope.windowWidth = $window.innerWidth;
      };
      $scope.initializeWindowSize();
      return angular.element($window).bind('resize', function() {
        $scope.initializeWindowSize();
        return $scope.$apply();
      });
    };
  });
