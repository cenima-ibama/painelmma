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

    $scope.meses = [
      {name: 'Janeiro', value: 'JANEIRO'},
      {name: 'Fevereiro', value: 'FEVEREIRO'}, 
      {name: 'Março', value: 'MARCO'},
      {name: 'Abril', value: 'ABRIL'}, 
      {name: 'Maio', value: 'MAIO'}, 
      {name: 'Junho', value: 'JUNHO'}, 
      {name: 'Julho', value: 'JULHO'}, 
      {name: 'Agosto', value: 'AGOSTO'}, 
      {name: 'Setembro', value: 'SETEMBRO'}, 
      {name: 'Outubro', value: 'OUTUBRO'}, 
      {name: 'Novembro', value: 'NOVEMBRO'}, 
      {name: 'Dezembro', value: 'DEZEMBRO'}
    ];

    var year = new Date();

    $scope.$on('load_public_diary', function(event, data){
      $scope.indiceMensal = data;
      console.log($scope.indiceMensal);
      $rootScope.$broadcast('load_mensal', data.BR);
    });

    // Aumentar ano / Diminuir ano
    // for(var i=2004; i<= year.getFullYear(); i++){
    for(var i=2004; i < year.getFullYear(); i++){
      $rootScope.anos.push(i.toString());
    }

    $scope.changeClass = function(item){
      var state = item.$$watchers[0].last;
      var datac = $scope.indiceMensal[state];
      $rootScope.$broadcast('load_mensal', datac);
    }


    $scope.changeForm = function(mes, ano){
      console.log(mes);
      console.log(ano);
    }

  // The other querys
  // ranking_assentamento
  // ranking_assentamento_estadual
  // ranking_terra_indigena
  // ranking_unidades_de_conservacao_protecao_integral
  // ranking_unidades_de_conservacao_protecao_integral_estadual
  // ranking_unidades_de_conservacao_uso_sustentavel
  // ranking_unidades_de_conservacao_uso_sustentavel_estadual



  });

