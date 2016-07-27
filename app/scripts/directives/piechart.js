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
        id: '=',
        pie: '=data',
        name: '=',
        addBut: '=',
        nextPrevBut: '=',
        optionBut: '=',
        size: '=',
        legend: '=',
        verticalLines: '=',
        loading: '=',
        object: '=',
        label: '=',
        error: '='
      },
      link: function postLink(scope) {

        scope.table = false;

        scope.options = {
          animationSteps: 50,
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

        scope.formatCsv = function(data, lab) {
          
          var csv = data.slice();
          var el;

          csv = csv[0].map(function(col, i) { 
            return csv.map(function(row) { 
              return row[i];
            });
          });

          angular.forEach(csv,function(value, key){
            value.reverse();
            value.push(lab[key]);
            value.reverse();
          });

          return csv;
        };

        scope.maximize = function(element) {

          scope.modal = scope.modal ? false : true;

          scope.datModal = scope.dat;
          scope.labModal = scope.lab;
          scope.serModal = scope.ser;
          scope.legendModal = scope.legend;
          scope.optionsModal = scope.options;
          scope.colorsModal = scope.colors;

          // scope.heighModal = maxHeight;
          
          var height = $(window).height() - 20;
          var width = $(window).width() - 155;

          // $("#modal-" + scope.object.tagId + ">.panel-maximize").css('height',height);
          // $("#modal-" + scope.object.tagId + ">.panel-maximize").css('width',width);

          $("#modal-" + scope.object.tagId).modal('toggle');
        };

        scope.formatHeader = function(ser) {
          if (ser){
            var head = ser.slice();
          } else {
            var head = ['Área'];
          }

          head.reverse();
          if (scope.label)
            head.push(scope.label);
          else
            head.push("#");
          head.reverse();

          return head;
        };

        scope.formatName = function(name) {
          return name + '.csv';
        };

      	scope.$watch('pie',function(data){

      		if(data) {
		      	scope.dat = data.data;
		      	scope.lab = data.labels;

            // if (scope.object.clickFunc) {

              // var column1 = data.data;
              // column1.unshift(data.labels[0]);

              // var column2 = data.data[1].slice();
              // column2.unshift(data.labels[1]);

              // var columns = [];
              // angular.forEach(data.data, function(value,key){
              //   columns.push([data.labels[key],value]);
              // });

              // c3.generate({
              //   bindto: '#' + scope.id + '-canvas',
              //   data: {
              //     columns: columns,
              //     type: 'pie',
              //     onclick: scope.object.clickFunc
              //   }
              // });
              
            // }
					}
        


          // scope.onclick = scope.object.clickFunc;

          switch (scope.size) {
            case 'small' :
              scope.sizeClass = 'col-sm-3';
              break;
            case 'large' :
              scope.sizeClass = 'col-sm-12';
              break;
            case 'medium':
              scope.sizeClass = 'col-sm-6';
              break;
            default :
              scope.sizeClass = 'col-sm-6';
              break;
          }

      	});

      }
    };
  });
