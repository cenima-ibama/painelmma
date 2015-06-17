'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:prodes
 * @description
 * # prodes
 */
angular.module('estatisticasApp')
  .directive('prodes', function (RestApi) {
	return {
		template: '<canvas class="chart-line chart-stats" data="dataProdes" ' +
		'labels="labelsProdes" legend="true" series="seriesProdes" options="options"></canvas>',
		restrict: 'AE',
		link: function postLink(scope, element, attrs) {
			Object.size = function(obj) {
			    var size = 0, key;
			    for (key in obj) {
			        if (obj.hasOwnProperty(key)) size++;
			    }
			    return size;
			};

			scope.$on('sincronoProdes', function(event, acumuladoDeter){
				scope.acumuladoDeter = acumuladoDeter.acumuladoDeter;
				
				RestApi.query({query: 'public_prodes'},

					function success(data, event){
					
						var estados = ['ac', 'am', 'ap', 'ma', 'mt', 'pa', 'ro', 'rr', 'to'];
						var dado = {};
						var br = {};
						var dadoAnos = 	{};
						var dadoEstados = {};
						var prodesAnosBD = [];

						for(var i=0; i<data.length; i++){
							var dataSplited = data[i].ano_prodes.split('/')[0] + '-' + data[i].ano_prodes.split('/')[1];					
							prodesAnosBD.push(dataSplited);
							dadoAnos[dataSplited] = {};

							// Forçando comparação dos anos
							if(dataSplited === prodesAnosBD[i]){
								delete data[i].ano_prodes;
								dadoAnos[prodesAnosBD[i]] = data[i].toJSON();
							}
						}

						for(var state = 0; state < estados.length; state++){
							dadoEstados[estados[state]] = {};
							for (var year = 0; year < Object.size(dadoAnos); year++){
								dadoEstados[estados[state]][prodesAnosBD[year]] = parseFloat(dadoAnos[prodesAnosBD[year]][estados[state]]);
							}
						}

						for(var year = 0; year < prodesAnosBD.length; year++){
							br[prodesAnosBD[year]] = 0;
							for(var state = 0; state < estados.length; state++){
								br[prodesAnosBD[year]] == undefined ? 0 : br[prodesAnosBD[year]];
								br[prodesAnosBD[year]] += parseFloat(dadoAnos[prodesAnosBD[year]][estados[state]]);
								br[prodesAnosBD[year]] = parseFloat(br[prodesAnosBD[year]]);
							}
						}

						dadoEstados.br = br;
						dado.anosProdes = dadoAnos;
						dado.estadosProdes = dadoEstados;
						dado.labelsProdes = prodesAnosBD;

						// Dado acumulado recebido por broadcast
						dado.acumuladoDeter = scope.acumuladoDeter;
						dado.acumuladoDeterAno = acumuladoDeter.acumuladoDeterAno;

						scope.$broadcast('load_public_prodes', dado);


					},
					function error(data, event){
						alert('Error query! Try Refresh Your Page');
					}
				);
			});

			scope.$on('chart_2', function(event, data){
				scope.dataProdes = [];
				scope.labelsProdes = [];
				scope.seriesProdes = ['Taxa PRODES', 'Taxa DETER'];

				var prodesAcumulado = [];

				angular.forEach(data.estados, function(value, key){
					prodesAcumulado.push(value);
					scope.labelsProdes.push(key); 
				});


				var acumuladoDeter = [];
				angular.forEach(data.prodes, function(value, key){
					acumuladoDeter.push(value);
				});


				scope.dataProdes.push(prodesAcumulado);
				scope.dataProdes.push(acumuladoDeter);

			});



   		}
   	}
  });
