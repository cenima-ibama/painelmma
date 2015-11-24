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
        loading: '=',
        object: '='
      },
      link: function postLink(scope) {
  			
        var showVerticalLines = 'true' || scope.verticalLines;
        scope.table = false;

        scope.options = {
          animationSteps: 3,
          bezierCurve : false,
          scaleShowVerticalLines: showVerticalLines,
          pointDot : false,
          pointHitDetectionRadius: 5,
          tooltipTemplate: "<%if (label){%>Dia <%=label%>: <%}%><%= value %> Km²",
        };

        scope.initiateCollapseEl = function() {
          $("#" + scope.object.tagId + " .panel-body").collapse();          
        }

        scope.toggleTable = function(){
          scope.table = !scope.table;
        };

        scope.hideGraph = function() {
          $("#" + scope.object.tagId + " .panel-body").collapse('hide')
        }

        scope.showGraph = function() {
          $("#" + scope.object.tagId + " .panel-body").collapse('show')
        }

        scope.$watch('line',function(data){

          if(data) {
            scope.dat = data.data;
            scope.lab = data.labels;
            scope.ser = data.series;
          }

          switch (scope.size) {
            case 'small' :
              scope.sizeClass = 'col-sm-3';
              break;
            case 'large' :
              scope.sizeClass = 'col-sm-12';
              break;
            case 'medium':
            default :
              scope.sizeClass = 'col-sm-6';
              break;
          }

        });
      }
    };
  });
