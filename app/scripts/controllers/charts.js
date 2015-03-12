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
	    {name: "AC", value: "AC" },
	    {name: "AP", value: "AP" },
	    {name: "AM", value: "AM" },
	    {name: "PA", value: "PA" },
	    {name: "RO", value: "RO" },
	    {name: "RR", value: "RR" },
	    {name: "TO", value: "TO" },
	    {name: "MT", value: "MT" },
	    {name: "MA", value: "MA" },
	    {name: "Amazônia Legal", value: "AMAZONIA LEGAL"}
	];

	data_type = ["public_diary", "public_cloud", "public_prodes"];

	RestApi.get({type: "public_cloud"}
		function success(data, status){
			console.log(data);
		}
		function error(data){
			console.log(data);
		}
	),

  });
