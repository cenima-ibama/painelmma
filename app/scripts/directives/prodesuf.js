'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:prodesuf
 * @description
 * # prodesuf
 */
angular.module('estatisticasApp')
  .directive('prodesuf', function () {
    return {
		template: '<canvas class="chart-bar chart-stats" data="dataProdesUf" ' +
		'labels="labelsProdesUf" legend="true" series="seriesProdesUf" options="options"></canvas>',
		restrict: 'AE',
		link: function postLink(scope, element, attrs) {
			scope.$on('load_public_prodes', function(event, data){
				var dado = new Object;

				dado.acumuladoProdes = data.estadosProdes;
				dado.acumuladoDeter = data.acumuladoDeter;
				dado.acumuladoDeterAno = data.acumuladoDeterAno;

				scope.$broadcast('load_prodes_uf', dado)
			});

			scope.$on('chart_3', function(event, data){
				var acumuladoAno = data.acumuladoDeterAno;

				scope.dataProdesUf = [];
				scope.seriesProdesUf = [];
				scope.labelsProdesUf = [];

				scope.seriesProdesUf = ['Taxa DETER', 'Taxa PRODES'];


				angular.forEach(acumuladoAno, function(value, key){
					scope.labelsProdesUf.push(key);
				})

				// angular.forEach(acumuladoAno.ac, function(value, key){
				// 	scope.seriesProdesUf.push(key);
				// })
				

				angular.forEach(acumuladoAno, function(value, key){
					scope.dataProdesUf[key] = [];
					delete acumuladoAno[key].BR;
					var i=0;
					angular.forEach(acumuladoAno[key], function(val, ky){
						scope.dataProdesUf[key][i]=val;
						i++;
					})
					// states++;
				})

				console.log(scope.dataProdesUf);

				scope.dataProdesUf = [scope.dataProdesuf[scope.dataProdesuf.length-1]];
				scope.labelsProdesUf = [scope.labelsProdesUf[scope.labelsProdesUf.length-2]];



				// Adicionando às labels, dados de anos sequenciais; 
				// angular.forEach(data.acumuladoProdes.br, function(value, key){
				// 	scope.seriesProdesUf.push(key);
				// });

				// delete data.acumuladoProdes.br;
				// delete data.acumuladoDeter.BR;

				// var anos = [];
				// angular.forEach(scope.labelsProdesUf, function(value, key){
				// 	anos[key] = [];
				// 	angular.forEach(data.acumuladoDeter, function(v, k){
				// 		angular.forEach(data.acumuladoDeter, function(val, ky){

				// 		})
				// 	})
				// })
				// var states = 0;
				// angular.forEach(data.acumuladoDeter, function(value, key){
				// 	scope.labelsProdesUf.push(key);
				// 	scope.dataProdesUf[states]=[]
				// 	var i=0;
				// 	angular.forEach(data.acumuladoDeter[key], function(v, k){
				// 		v = isNaN(v) ? 0 : v;
				// 		scope.dataProdesUf[states][i] = parseFloat(v);
				// 		i++;
				// 	})
				// 	states++;
				// })
			});

		}
    };
  });
