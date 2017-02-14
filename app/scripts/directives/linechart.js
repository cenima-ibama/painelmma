'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:lineChart
 * @description
 * # lineChart
 */
angular.module('estatisticasApp')
  .directive('lineChart',['$timeout',function ($timeout) {
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
        object: '=',
        label: '=',
        error: '=',
        measure: '='
      },
      link: function postLink(scope) {
  			
        var showVerticalLines = 'true' || scope.verticalLines;
        scope.table = false;
        scope.modal = false;

        var lab = typeof(scope.label) === 'undefined' ? '' : scope.label;
        var meas = typeof(scope.measure) === 'undefined' ? 'Km²' : scope.measure;

        scope.options = {
          animationSteps: 3,
          bezierCurve : false,
          scaleShowVerticalLines: showVerticalLines,
          pointDot : false,
          pointHitDetectionRadius: 5,
          tooltipTemplate: "<%if (label){%>" + lab + " <%=label%>: <%}%><%= value %> " + meas,
        };

        scope.colors = ['#3ABCFC', '#FC2121', '#D0FC3F', '#FCAC0A',
         '#67C2EF', '#FF5454', '#CBE968', '#FABB3D',
         '#77A4BD', '#CC6C6C', '#A6B576', '#C7A258'];

        scope.initiateCollapseEl = function() {
          $("#" + scope.object.tagId + " .panel-body").collapse();          
        };

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

          // var csv = $.map(data,function(array){
          //   array.reverse();
          //   array.push('id');
          //   array.reverse();

          //   return array;
          // });
          // angular.forEach(csv,function(value,key){
          //   value[0] = scope.ser[key];
          // });


          return csv;
        };

        // scope.initModal = function() {
        //   $timeout(function(){
        //     $("#modal-" + scope.object.tagId).modal('toggle');
        //   },0);          
        // }

        scope.maximize = function(element) {

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

          // if (scope.modal) {
          //   scope.initModal();
          //   scope.modal = false;
          // } else {
          //   scope.modal = true;
          // }

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

        scope.hideGraph = function() {
          $("#" + scope.object.tagId + " .panel-body").collapse('hide');
        };

        scope.showGraph = function() {
          $("#" + scope.object.tagId + " .panel-body").collapse('show');
        };

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
              scope.sizeClass = 'col-sm-6';
              break;
            default :
              scope.sizeClass = 'col-sm-6';
              break;
          }

        });
      }
    };
  }]);
