'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:cloud
 * @description
 * # cloud
 */

angular.module('estatisticasApp')
  .directive('cloud', function (RestApi) {
    return {
      template: '<canvas  class="chart-line chart-stats" data="data" labels="labels" legend="true" series="series" options="options"></canvas>',
      restrict: 'AE',
      link: function postLink(scope, element, attrs) {

	  	RestApi.query({query: 'public_cloud'},
	  		function success(data, status){
				var today = new Date();
				var dado = [];
				var years = [];


				// Invertendo dado para que a consulta no dado retornado
				// Facilitando a comparação com o dado retornado do banco
				for (var i = today.getFullYear(); i>= 2008 ; i--){
					years.push(i.toString());
				};

				dado[0] = years;
				var retorno = [];

				for(var x=0; x < years.length; x++){
					retorno[x] = []
					for (var m = 1; m <= 12; m++){	
						var lastDay = 0;
						var end = 0;
						for(var i = 0; i<data.length; i++){
							var date = data[i].data.split('-');
							if(date[0] == years[x]){
								var month = date[1];
								var day = parseInt(date[2]);

								if (month == m){
									if(day > lastDay){
										lastDay = day;
										end = data[i].percent;
									}
								}
							}
							
						}
						retorno[x].push(Math.round(parseFloat(end) * 100));
					}
  				}
  				dado.push(retorno);

	  			// Broadcasting data para o escopo global, modo assíncrono
	  			// retorna o dado pra um escopo totalmente diferente do usual
	  			scope.$broadcast('load_cloud', dado);

	  		}

	  	);

		Chart.defaults.global.colours = ["#00B2EE", "#F7464A", "#46BFBD", "#7B68EE", "#FDB45C", "#949FB1", "#4D5360"];

	  	scope.$on('load_cloud', function(event, dado){


	  		// scope.ProdesDado = function(arrayLocal, arrayAno, arrayMes){
  			// 	var data = [];
	  		// 	if(arrayLocal == true){
	  		// 		for(var l=0; l<arrayLocal.length; l++){
	  		// 			data[l] = [];
	  		// 			for (var ano =)
	  		// 		}
	  		// 	}

	  		// 	for (var i=0; i<lengthLocal; i++){

	  		// 	}
	  		// }


	  		var labels = [];
	  		var emptyData = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
	  		var data = [];

	  		dado[0].reverse();
	  		dado[1].reverse();

	  		for (var i=0; i < dado[0].length - 1; i++) {
	  			labels.push(dado[0][i] + " - " + dado[0][i+1]);
	  		}

	  		for (var i=0; i < dado[1].length; i++) {

	  			if (i < dado[1].length -1) {
		  			data[i] = dado[1][i].slice(7);
		  			data[i] = data[i].concat(dado[1][i+1].slice(0,7));
		  		}

	  			if (JSON.stringify(dado[1][i]) == JSON.stringify(emptyData)){
	  				dado[1].splice(i,1);
	  			}
	  			if (JSON.stringify(data[i]) == JSON.stringify(emptyData)){
	  				data.splice(i,1);
	  			}
	  		}

	  		scope.cloud = dado;
	  		scope.labels = ['AGO', 'SET','OUT', 'NOV', 'DEZ','JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL']; 
	  		scope.series = labels;
	  		scope.data = data;
	  	})
      }
    };
  });





