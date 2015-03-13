'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:cloud
 * @description
 * # cloud
 */



angular.module('estatisticasApp')
  .directive('cloud', function (RestApi, $rootScope) {
    return {
      template: '<div></div>',
      restrict: 'AE',
      link: function postLink(scope, element, attrs) {
	  	RestApi.query({query: 'public_cloud'},
	  		function success(data, status){
	  			//Broadcasting data para o escopo global
	  			//Por que este servico retorna o dado para um escopo diferente
	  			$rootScope.$broadcast('load_cloud', data);
	  			// for (var i=0; i<data.length; i++){
	  				
	  			// }

	  		}
	  	);

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Topping');
            data.addColumn('number', 'Slices');
            data.addRows([
              ['Mushrooms', 3],
              ['Onions', 1],
              ['Olives', 1],
              ['Zucchini', 1],
              ['Pepperoni', 2]
            ]);

            // Set chart options
            var options = {'title':'How Much Pizza I Ate Last Night',
                           'width':400,
                           'height':300};

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(element[0]);
            chart.draw(data, options);
        console.log('this is the cloud directive');
      }
    };
  });

google.load('visualization', '1', {packages: ['corechart']});


