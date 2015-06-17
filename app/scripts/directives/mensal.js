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
            var estadosBR = ['AC','AM', 'AP', 'MA', 'MT', 'PA', 'RO', 'RR', 'TO', 'BR'];


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
                          dado[scope.estados[i]][y][m] = parseFloat(dado[scope.estados[i]][y][m].toFixed(2));
                        }
                      }         
                    }               
                  }               
                }
              }
              // Refatorando o vetor para visualização baseado em 
              // Calendário PRODES
              var key = [];
              for(var k =0; k<dado[scope.estados[i]].length; k++){
                key[k] = [];
                  if (k < dado[scope.estados[i]].length-1) {
                    key[k] = dado[scope.estados[i]][k].slice(7);
                    key[k] = key[k].concat(dado[scope.estados[i]][k+1].slice(0,7));
                  }
              }
              dado[scope.estados[i]] = key;
            }

            // Criando o objeto pra Amazonia legal com dados zerados para soma
      			dado['BR'] = [];
      			for (var i=0; i<scope.yearsProdes.length; i++){
	      			dado.BR[i] = [];
	      			for (var j=0; j<months.length; j++){
	      				dado.BR[i][j] = 0;
	      			}
      			}

      			var dadoFinal = [dado.AC, dado.AP, dado.AM, dado.MA, dado.MT, dado.PA, dado.RO, dado.RR, dado.TO, dado.BR];

            //Passando os valores de todos os arrays pra um
            //para criar o dado da Amazônia legal (Somatória de todos os dados)
            for(var y = 0; y < scope.yearsProdes.length; y++){
              for(var e = 0; e < scope.estados.length; e++){
                for(var m = 0; m < months.length; m++){
                  dado.BR[y][m] += parseFloat(dadoFinal[e][y][m]);
                  dado.BR[y][m] = parseFloat((dado.BR[y][m]).toFixed(2));
                } 
              }
            }


            // Passagem dos valores em array pra objetos
            var jsonData = {};
            for (var di = 0; di < dadoFinal.length; di++){
              jsonData[estadosBR[di]] = {};
              for (var it = 0; it < dadoFinal[di].length; it++){
                jsonData[estadosBR[di]][scope.yearsProdes[it]] = {};
                jsonData[estadosBR[di]][scope.yearsProdes[it]] = dado[estadosBR[di]][it];
              }
            }



            // Criando objeto com a somatória dos dados de cada array por ano
            var acumuladoDeter = {};
            angular.forEach(jsonData, function(value, key){
              acumuladoDeter[key] = {};
              angular.forEach(jsonData[key], function(v, k){      
                acumuladoDeter[key][k] = 0;
                angular.forEach(jsonData[key][k], function(val, ky){
                  val = isNaN(val) ? 0 : val;
                  acumuladoDeter[key][k] += parseFloat(val);
                  acumuladoDeter[key][k] = parseFloat(parseFloat(acumuladoDeter[key][k]).toFixed(2));
                })
              })
            })

            // dado a ser utilizado no chart_4
            var yearsData = {};
            angular.forEach(scope.yearsProdes, function(value, key){ 
              yearsData[value] = {};
              angular.forEach(acumuladoDeter, function(v, k){
                yearsData[value][k] = [];
                angular.forEach(acumuladoDeter[k], function(val, ky){
                if(value == ky)
                  yearsData[value][k] = val;
                })
              })
            })
            jsonData.acumuladoDeter = acumuladoDeter;
            jsonData.acumuladoDeterAno = yearsData;

      			scope.$broadcast('load_public_diary', jsonData);
      		}
      	);

      	scope.$on('chart_1', function(event, data){
      		scope.labelsMensal = ['AGO', 'SET', 'OUT', 'NOV', 'DEZ', 'JAN', 'FEV','MAR', 'ABR', 'MAI','JUN', 'JUL']; 
          scope.dataMensal = [data['2013-2014'],data['2012-2013']];
          scope.seriesMensal = ['2013-2014', '2012-2013'];

      	});
      }
    };
  });
