'use strict';

/**
 * @ngdoc function
 * @name estatisticasApp.controller:ChartsCtrl
 * @description
 * # ChartsCtrl
 * Controller of the estatisticasApp
 */

angular.module('estatisticasApp')
  .controller('ChartsCtrl', function ($scope, $rootScope, RestApi) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.systemInfo = 'Teste de Aplicação';
    $rootScope.SystemName = 'Painel de desmatamento';

    $scope.states = [
	    {name: 'AC', value: 'AC' },
	    {name: 'AP', value: 'AP' },
	    {name: 'AM', value: 'AM' },
	    {name: 'PA', value: 'PA' },
	    {name: 'RO', value: 'RO' },
	    {name: 'RR', value: 'RR' },
	    {name: 'TO', value: 'TO' },
	    {name: 'MT', value: 'MT' },
	    {name: 'MA', value: 'MA' },
	    {name: 'Amazônia Legal', value: 'AMAZONIA LEGAL'}
	];

	//Retorno do broadcast para utilizar no escopo do ChartsCtrl
	$rootScope.$on('load_diary', function(event, data){$scope.diary = data;});
	$rootScope.$on('load_cloud', function(event, data){$scope.cloud = data;});
	$rootScope.$on('load_consolidado', function(event, data){$scope.consolidado = data;});
	$rootScope.$on('load_prodes', function(event, data){$scope.prodes = data;});


	//utilizando RestApi abaixo
	//Requisição enviada ao controlador que retorna via broadcast
	//Dados serão capturados em $rootScope.$on
  	RestApi.query({query: 'public_prodes'},
  		function success(data, status){
  			//Broadcasting data para o escopo global
  			//Por que este servico retorna o dado para um escopo diferente
  			$rootScope.$broadcast('load_prodes', data);
  		}
  	);

  	RestApi.query({query: 'public_diary'},
  		function success(data, status){
  			$rootScope.$broadcast('load_diary', data);
  		}
  	);

  	RestApi.query({query: 'dado_prodes_consolidado'},
  		function success(data, status){
  			$rootScope.$broadcast('load_consolidado', data);
  		}
  	);



  // The other querys
  // ranking_assentamento
  // ranking_assentamento_estadual
  // ranking_terra_indigena
  // ranking_unidades_de_conservacao_protecao_integral
  // ranking_unidades_de_conservacao_protecao_integral_estadual
  // ranking_unidades_de_conservacao_uso_sustentavel
  // ranking_unidades_de_conservacao_uso_sustentavel_estadual



  });

