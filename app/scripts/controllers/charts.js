'use strict';

/**
 * @ngdoc function
 * @name estatisticasApp.controller:ChartsCtrl
 * @description
 * # ChartsCtrl
 * Controller of the estatisticasApp
 */

angular.module('estatisticasApp')
  .controller('ChartsCtrl', function ($scope, $rootScope, formData) {

    $rootScope.mapView = false;

    $scope.meses = formData.meses;
    $scope.anos = formData.anos;
    $scope.estados = formData.estados;

    $scope.options = {
      animationSteps: 5,
      bezierCurve : false
    };



    // $scope.$on('load_public_diary', function(event, data){
    //   $rootScope.indiceMensal = data;
    //   $rootScope.$broadcast('sincronoProdes', data);
    //   $rootScope.$broadcast('chart_1', data.BR);
    // });

    // $scope.$on('load_public_prodes', function(event, data){
    //   var dado = new Object;
    //   dado.estados = data.estadosProdes.br;
    //   dado.labels = data.labelsProdes;
    //   dado.prodes = data.acumuladoDeter.BR;

    //   $rootScope.$broadcast('chart_2', dado);
    //   $rootScope.dadosProdes = data;

    // });
    
    // $scope.$on('load_prodes_uf', function(event, data){
    //   var dado = new Object;
    //   dado.acumuladoDeter = data.acumuladoDeter;
    //   dado.acumuladoProdes = data.acumuladoProdes;
    //   dado.acumuladoDeterAno = data.acumuladoDeterAno;

    //   $rootScope.$broadcast('chart_3', dado);
    // });


    // $scope.changeClass = function(item){
    //   var state = item.$$watchers[1].last;
    //   var data = $scope.indiceMensal[state];
    //   var stateLower = state.toLowerCase();
    //   var dadoProdes = {};

    //   dadoProdes.estados = $scope.dadosProdes.estadosProdes[stateLower];
    //   dadoProdes.labels = $scope.dadosProdes.labelsProdes;
    //   dadoProdes.prodes = $scope.dadosProdes.acumuladoDeter[state];

    //   $rootScope.$broadcast('chart_1', data);
    //   $rootScope.$broadcast('chart_2', dadoProdes);
    // }

  });

