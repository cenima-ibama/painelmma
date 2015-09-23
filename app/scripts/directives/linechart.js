'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:lineChart
 * @description
 * # lineChart
 */
angular.module('estatisticasApp')
  .directive('lineChart', function () {
    return {
      templateUrl: 'views/partials/lineChart.html',
      restrict: 'E',
      replace: true,
      scope: {
        line: '=data',
        name: '=',
        addBut: '=',
        nextPrevBut: '=',
        optionBut: '=',
        size: '=',
        legend: '=',
        verticalLines: '=',
        loading: '='
      },
      link: function postLink(scope) {
  			
        var showVerticalLines = 'true' || scope.verticalLines;

        scope.options = {
          animationSteps: 3,
          bezierCurve : false,
          scaleShowVerticalLines: showVerticalLines,
          pointDot : false,
          pointHitDetectionRadius: 5,
          tooltipTemplate: "<%if (label){%>Dia <%=label%>: <%}%><%= value.toFixed(2) %> Km²",
        };

        scope.$watch('line',function(data){

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
