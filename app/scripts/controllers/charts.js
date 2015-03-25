'use strict';

/**
 * @ngdoc function
 * @name estatisticasApp.controller:ChartsCtrl
 * @description
 * # ChartsCtrl
 * Controller of the estatisticasApp
 */

angular.module('estatisticasApp')
  .controller('ChartsCtrl', function ($scope, $rootScope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.systemInfo = 'Teste de Aplicação';
    $rootScope.SystemName = 'Painel de desmatamento';

    $scope.baseUrl = 'images/icons';
    
    $scope.ufs = [
        { name: 'AC', image: $scope.baseUrl + '/AC.png' },
        { name: 'AM', image: $scope.baseUrl + '/AM.png' },
        { name: 'AP', image: $scope.baseUrl + '/AP.png' },
        { name: 'MA', image: $scope.baseUrl + '/MA.png' },
        { name: 'MT', image: $scope.baseUrl + '/MT.png' },
        { name: 'PA', image: $scope.baseUrl + '/PA.png' },
        { name: 'RO', image: $scope.baseUrl + '/RO.png' },
        { name: 'RR', image: $scope.baseUrl + '/RR.png' },
        { name: 'TO', image: $scope.baseUrl + '/TO.png' },
        { name: 'BR', image: $scope.baseUrl + '/BR.png' }
    ];

    $rootScope.estados = ['AC','AM', 'AP', 'MA', 'MT', 'PA', 'RO', 'RR', 'TO'];


    $rootScope.anos = [];

    var year = new Date();

    // Aumentar ano / Diminuir ano
    // for(var i=2004; i<= year.getFullYear(); i++){
    for(var i=2004; i< year.getFullYear(); i++){
      $rootScope.anos.push(i.toString());
    }

    $scope.meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];


    $scope.changeForm = function(uf, mes, ano){
      console.log(uf);
      console.log(mes);
      console.log(ano);

    }

	//Retorno do broadcast para utilizar no escopo do ChartsCtrl
	$rootScope.$on('load_diary', function(event, data){$scope.diary = data;});
	$rootScope.$on('load_cloud', function(event, data){$scope.cloud = data;});
	$rootScope.$on('load_consolidado', function(event, data){$scope.consolidado = data;});
	$rootScope.$on('load_prodes', function(event, data){$scope.prodes = data;});


	//utilizando RestApi abaixo
	//Requisição enviada ao controlador que retorna via broadcast
	//Dados serão capturados em $rootScope.$on
  	// RestApi.query({query: 'public_prodes'},
  	// 	function success(data, status){
  	// 		//Broadcasting data para o escopo global
  	// 		//Por que este servico retorna o dado para um escopo diferente
  	// 		$rootScope.$broadcast('load_prodes', data);
  	// 	}
  	// );

  	// RestApi.query({query: 'public_diary'},
  	// 	function success(data, status){
  	// 		$rootScope.$broadcast('load_diary', data);
  	// 	}
  	// );

  	// RestApi.query({query: 'dado_prodes_consolidado'},
  	// 	function success(data, status){
  	// 		$rootScope.$broadcast('load_consolidado', data);
  	// 	}
  	// );



  // The other querys
  // ranking_assentamento
  // ranking_assentamento_estadual
  // ranking_terra_indigena
  // ranking_unidades_de_conservacao_protecao_integral
  // ranking_unidades_de_conservacao_protecao_integral_estadual
  // ranking_unidades_de_conservacao_uso_sustentavel
  // ranking_unidades_de_conservacao_uso_sustentavel_estadual



  });

