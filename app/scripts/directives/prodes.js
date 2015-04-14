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

		// template: '<div>{{dadoProdes}}</div>', 
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

			RestApi.query({query: 'public_prodes'},

				function success(data, event){
					
					var estados = ['ac', 'am', 'ap', 'ma', 'mt', 'pa', 'ro', 'rr', 'to'];
					var anos = [];
					var dado = [];
					var perState = [];

					var br = [];

					for(var i=0; i<data.length; i++){
						anos.push(data[i].ano_prodes);
						dado[i] = [data[i].ac, data[i].am, data[i].ap, data[i].ma, data[i].mt, data[i].pa, data[i].ro, data[i].rr, data[i].to];
					}
					console.log(dado);

					for(var count=0; count< estados.length; count++){
						perState[estados[count]] = [];
						for(var years=0; years<Object.size(data[count]); years++){
							perState[estados[count]].push(dado[years][count]);
						}
					}

					for (var count=0; count< dado.length; count++){
						br[count] = 0;
						for (var counter=0; counter<dado[count].length; counter++){
							br[count]==undefined ? 0 : br[count][counter];
							br[count]+= parseFloat(dado[count][counter]);
						}
					}

					perState.br = br;

					perState['anos'] = anos;
					scope.$broadcast('load_public_prodes', perState);

				},
				function error(data, event){
					alert('Error query!');
				}
			);

			scope.$on('load_prodes_state', function(event, data){
					scope.labelsProdes = data[1];
					scope.dataProdes = [data[0]];
					scope.seriesProdes = ['Taxa PRODES'];

			});


			scope.options = {
				animationSteps: 5,
				bezierCurve : false
			};


   		}
   	}
  });
