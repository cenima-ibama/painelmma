'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:mensal
 * @description
 * # mensal
 */
angular.module('estatisticasApp')
  .directive('mensal', function (RestApi) {
    return {
      template: '<canvas class="chart-line chart-stats" data="dataMensal" ' +
                'labels="labelsMensal" legend="true" series="seriesMensal" options="options"></canvas>',
      restrict: 'AE',
      link: function postLink(scope, element, attrs) {
      	RestApi.query({query: 'public_diary'},
      		function success(data, status){
      			var dado = [];
      			scope.public_diary = data;

				    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

      			for (var i=0; i<scope.estados.length; i++){
      				dado[scope.estados[i]] = [];
      				for(var y=0; y<scope.anos.length; y++){
      					dado[scope.estados[i]][y] = [];
      					for(var m=0; m<12; m++){
                  dado[scope.estados[i]][y][m] = 0;
		      				for(var count = 0; count<data.length; count++){
    								if(data[count].estado == scope.estados[i]){
    									if(data[count].data.split('-')[0] == scope.anos[y]){
    										if(data[count].data.split('-')[1] == months[m]){
    											dado[scope.estados[i]][y][m] += parseFloat(data[count].total);
    										}
    									}					
    								}      					
		      				}     					
						    }
      				}
      			}

      			dado['BR'] = [];

      			for (var i=0; i<scope.anos.length; i++){
	      			dado.BR[i] = [];
	      			for (var j=0; j<months.length; j++){
	      				dado.BR[i][j] = 0;
	      			}
      			}

      			var dadoFinal = [dado.AC, dado.AP, dado.AM, dado.MA, dado.MT, dado.PA, dado.RO, dado.RR, dado.TO, dado.BR];

            //Passando os valores de todos os arrays pra um
            //para criar o dado da Amazônia legal (Somatória de todos os dados)
            for(var y=0; y<scope.anos.length; y++){
              for(var e=0; e<scope.estados.length; e++){
                for(var m = 0; m < months.length; m++){
                  dado.BR[y][m] += parseFloat(dadoFinal[e][y][m]);
                } 
              }
            }


      			scope.$broadcast('load_public_diary', dado);
      		}
      	);

      	scope.$on('load_mensal', function(event, data){

      		scope.seriesMensal = scope.anos;
      		scope.labelsMensal = ['JAN', 'FEV','MAR', 'ABR', 'MAI','JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']; 
	  		
      		scope.dataMensal = data;
      	});


      }
    };
  });
