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
        { name: 'AC', image: $scope.baseUrl + '/AC.png', subtitle: 'AC' },
        { name: 'AM', image: $scope.baseUrl + '/AM.png', subtitle: 'AM' },
        { name: 'AP', image: $scope.baseUrl + '/AP.png', subtitle: 'AP' },
        { name: 'MA', image: $scope.baseUrl + '/MA.png', subtitle: 'MA' },
        { name: 'MT', image: $scope.baseUrl + '/MT.png', subtitle: 'MT' },
        { name: 'PA', image: $scope.baseUrl + '/PA.png', subtitle: 'PA' },
        { name: 'RO', image: $scope.baseUrl + '/RO.png', subtitle: 'RO' },
        { name: 'RR', image: $scope.baseUrl + '/RR.png', subtitle: 'RR' },
        { name: 'TO', image: $scope.baseUrl + '/TO.png', subtitle: 'TO' },
        { name: 'BR', image: $scope.baseUrl + '/BR.png', subtitle: 'Amazônia Legal' }
    ];

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

    $rootScope.estados = ['AC','AM', 'AP', 'MA', 'MT', 'PA', 'RO', 'RR', 'TO'];
    $rootScope.anos = [];
    $scope.yearsProdes = [];

    var year = new Date();

    $scope.options = {
      animationSteps: 5,
      bezierCurve : false
    };

    // Aumentar ano / Diminuir ano
    // for(var i=2004; i<= year.getFullYear(); i++){
    for(var i=2004; i < year.getFullYear(); i++){
      $rootScope.anos.push(i.toString());
    }

    for (var i=0; i < $scope.anos.length; i++) {
      $scope.yearsProdes.push($scope.anos[i] + "-" + $scope.anos[i+1]);
    }
    

    $scope.$on('load_public_diary', function(event, data){
      $rootScope.indiceMensal = data;
      $rootScope.$broadcast('sincronoProdes', data);
      $rootScope.$broadcast('chart_1', data.BR);
    });

    $scope.$on('load_public_prodes', function(event, data){
      var dado = new Object;
      dado.estados = data.estadosProdes.br;
      dado.labels = data.labelsProdes;
      dado.prodes = data.acumuladoDeter.BR;

      $rootScope.$broadcast('chart_2', dado);
      $rootScope.dadosProdes = data;

    });
    
    $scope.$on('load_prodes_uf', function(event, data){
      var dado = new Object;
      dado.acumuladoDeter = data.acumuladoDeter;
      dado.acumuladoProdes = data.acumuladoProdes;
      dado.acumuladoDeterAno = data.acumuladoDeterAno;

      $rootScope.$broadcast('chart_3', dado);
    });


    $scope.changeClass = function(item){
      var state = item.$$watchers[1].last;
      var data = $scope.indiceMensal[state];
      var stateLower = state.toLowerCase();
      var dadoProdes = {};

      dadoProdes.estados = $scope.dadosProdes.estadosProdes[stateLower];
      dadoProdes.labels = $scope.dadosProdes.labelsProdes;
      dadoProdes.prodes = $scope.dadosProdes.acumuladoDeter[state];

      $rootScope.$broadcast('chart_1', data);
      $rootScope.$broadcast('chart_2', dadoProdes);
    }

  });

