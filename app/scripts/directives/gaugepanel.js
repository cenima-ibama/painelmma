'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:gaugePanel
 * @description
 * # gaugePanel
 */
angular.module('estatisticasApp')
  .directive('gaugePanel', ['$timeout',function ($timeout) {
    return {
      templateUrl: 'views/partials/gaugePanel.html',
      restrict: 'E',
      replace: true,
      scope: {
        gaugeId: '=',
        data: '=',
        loading: '=',
        object: '='
      },
      link: function postLink(scope, element) {

      	// element.attr('id',scope.gaugeId);

        scope.$watch('data',function(data){

      		if (data) {
	      		$timeout(function() {
			      	var id = '#' + scope.gaugeId

			      	var chart = c3.generate({
						    bindto: id,   
					    	data: {
					        columns: [
				            [data.label, data.data]
					        ],
					        type: 'gauge',
					        // onclick: function (d, i) { console.log("onclick", d, i); },
					        // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
					        // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
						    },
						    size: {
						        height: 100
						    },
						    gauge: {
		        			label: {
										format: data.formatValue,
		        			},
						    	units: data.units,
						    	min: -100
						    },
						    color: {
						        pattern: ["#60B044","#60B044","#FF0000"], // the three color levels for the percentage values.
						        threshold: {
						            values: [-99, 0, 100]
						        }
						    }
						    // data: {
						    //   columns: [
						    //     ['data1', 30, 200, 100, 400, 150, 250],
						    //     ['data2', 50, 20, 10, 40, 15, 25]
						    //   ],
						    //   axes: {
						    //     data2: 'y2' // ADD
						    //   }
						    // },
						    // axis: {
						    //   y2: {
						    //     show: true // ADD
						    //   }
						    // }
							});
						}, 0);
					}	
				});
      }
    };
  }]);
