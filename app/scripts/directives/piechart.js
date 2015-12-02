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
        loading: '=',
        object: '='
      },
      link: function postLink(scope) {

        scope.table = false;

        scope.options = {
          animationSteps: 3,
          pointDot : false,
          pointHitDetectionRadius: 5,
          tooltipTemplate: " <%=label%>: <%= numeral(value).format('(00[.]00)') %> (<%= numeral(circumference / 6.283).format('(0[.][00]%)') %>)"
        };
        
        scope.colors = ['#3ABCFC', '#FC2121', '#D0FC3F', '#FCAC0A',
         '#67C2EF', '#FF5454', '#CBE968', '#FABB3D',
         '#77A4BD', '#CC6C6C', '#A6B576', '#C7A258'];

        scope.toggleTable = function(){
          scope.table = !scope.table;
        };

      	scope.$watch('pie',function(data){

      		if(data) {
		      	scope.dat = data.data;
		      	scope.lab = data.labels;
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
