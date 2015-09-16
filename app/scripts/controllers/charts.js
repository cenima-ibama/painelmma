'use strict';

/**
 * @ngdoc function
 * @name estatisticasApp.controller:ChartsCtrl
 * @description
 * # ChartsCtrl
 * Controller of the estatisticasApp
 */

angular.module('estatisticasApp')
  .controller('ChartsCtrl', function ($scope, $rootScope, formData, RestApi) {

    $rootScope.mapView = false;

    $scope.meses = formData.meses;
    $scope.anos = formData.anos;
    $scope.estados = formData.estados;
    $scope.tipos = formData.tipos;

    $scope.mes = $scope.meses[new Date().getMonth()];
    $scope.ano = new Date().getFullYear();
    $scope.tipo = $scope.tipos.filter(function(a){if(a.value=='deter')return a})[0];


    $scope.prodesAno = $scope.mes > 6 ? $scope.ano + "-" ($scope.ano + 1).toString.substr(2) : ($scope.ano - 1) + "-" + $scope.ano.toString().substr(2);


    $scope.options = {
      animationSteps: 5,
      bezierCurve : false
    };


    $scope.changeClass = function(uf) {
        $scope.estados = $scope.estados.map(function(ele){
            ele.selected = "";
            return ele;
        });

        $scope.estados.filter(function(a){ 
            if(a == uf){
                a.selected="active";
            }
        });
    };



    $scope.lineChart1 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87','7.85']]};
    $scope.lineChart2 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87','7.85'],['240.92','94.32','3.78','1149.32','150.42','390.89','681.95','7.85','152.87']], 'series':['2014-2015','2013-2014']};
    $scope.lineChart3 = {'labels':['2007-2008','2008-2009','2009-2010','2010-2011','2011-2012','2012-2013','2013-2014','2014-2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87','7.85'],['240.92','94.32','3.78','1149.32','150.42','390.89','681.95','7.85','152.87']], 'series':['2014-2015','2013-2014']};
    $scope.lineChart4 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87','7.85'],['240.92','94.32','3.78','1149.32','150.42','390.89','681.95','7.85','152.87']], 'series':['2014-2015','2013-2014']};

    $scope.barChart1 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87','7.85'],['240.92','94.32','3.78','1149.32','150.42','390.89','681.95','7.85','152.87']], 'series':['Alerta DETER','Taxa PRODES']};
    $scope.barChart2 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['150.42','152.87','94.32','3.78','7.85','1149.32','390.89','681.95','240.92'],['240.92','94.32','3.78','1149.32','150.42','390.89','681.95','7.85','152.87']], 'series':['Alerta DETER','Taxa PRODES']};
    
    $scope.pieChart1 = {'labels':['AC','AM','MA','MT','PA','RO','RR','TO','Outro'],'data':[94.32,240.92,3.78,15.42,1149.32,681.95,390.89,152.87,7.85]};
    $scope.pieChart2 = {'labels':['AC','AM','MA','MT','PA','RO','RR','TO','Outro'],'data':[94.32,240.92,3.78,15.42,1149.32,681.95,390.89,152.87,7.85]};
    // RestApi.query({query:"public_daily"}, function success(data,status){
    //     console.log(data);
    // });
    // RestApi.query({query:""}, function success(data,status){});
    // RestApi.query({query:""}, function success(data,status){});
    // RestApi.query({query:""}, function success(data,status){});


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

