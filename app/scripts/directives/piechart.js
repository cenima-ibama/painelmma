'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:pieChart
 * @description
 * # pieChart
 */
angular.module('estatisticasApp')
  .directive('pieChart', function () {
    return {
      templateUrl: 'views/partials/pieChart.html',
      restrict: 'E',
      replace: true,
      scope: {
        pie: '=data',
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

        scope.options = {
          animationSteps: 3,
          pointDot : false,
          pointHitDetectionRadius: 5,
          tooltipTemplate: " <%=label%>: <%= numeral(value).format('(00[.]00)') %> (<%= numeral(circumference / 6.283).format('(0[.][00]%)') %>)"
        };

      	scope.$watch('pie',function(data){

      		if(data) {
		      	scope.dat = data.data;
		      	scope.lab = data.labels;
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
