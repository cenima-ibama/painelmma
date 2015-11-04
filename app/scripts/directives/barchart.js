'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:barChart
 * @description
 * # barChart
 */
angular.module('estatisticasApp')
  .directive('barChart', function () {
    return {
      templateUrl: 'views/partials/barChart.html',
      restrict: 'E',
      replace: true,
      scope: {
        bar: '=data',
        name: '=',
        addBut: '=',
        nextPrevBut: '=',
        optionBut: '=',
        size: '=',
        legend: '=',
        verticalLines: '=',
        loading: '=',
        object: '='
      },
      link: function postLink(scope) {

        var showVerticalLines = 'true' || scope.verticalLines;

        scope.options = {
          animationSteps: 2,
          bezierCurve : false,
          scaleShowVerticalLines: showVerticalLines,
          scaleBeginAtZero: false,
          responsive: true
        };

        scope.$watch('bar',function(data){

          if(data) {
            scope.dat = data.data;
            scope.lab = data.labels;
            scope.ser = data.series;
          }

          switch (scope.size) {
            case 'small' :
              scope.sizeClass = 'col-lg-3';
              break;
            case 'large' :
              scope.sizeClass = 'col-lg-12';
              break;
            case 'medium':
            default :
              scope.sizeClass = 'col-lg-6';
              break;
          }

        });
      }
    };
  });
