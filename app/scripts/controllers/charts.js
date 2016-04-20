'use strict';

/**
 * @ngdoc function
 * @name estatisticasApp.controller:ChartsCtrl
 * @description
 * # ChartsCtrl
 * Controller of the estatisticasApp
 */

angular.module('estatisticasApp')
  .controller('ChartsCtrl', function ($scope, $rootScope, formData, RestApi, restFunctions, $cookies, $http) {
    $rootScope.mapView = false;
    $rootScope.today = new Date();

    $scope.meses = formData.meses;
    $scope.anos = formData.anos;
    $scope.estados = formData.estados;
    $scope.tipos = formData.tipos;
    $scope.estagios = formData.estagios;


    var mes = $rootScope.filters ? $rootScope.filters.mes : (new Date().getMonth() + 1);
    $scope.mes = $scope.meses[mes-1];

    var ano = $rootScope.filters ? $rootScope.filters.ano : new Date().getFullYear();
    $scope.ano = ano;

    var tipo = $rootScope.filters ? $rootScope.filters.tipo : 'DETER';
    $scope.tipo = $scope.tipos.filter(function(a){if(a.value==tipo)return a;})[0];

    var filter_function = function(a){
      var estagio_original = $rootScope.filters.estagio == '' ? 'Degradação + Corte Raso' : $rootScope.filters.estagio;
      return a.name = estagio_original;
    };
    var estagio = $rootScope.filters ? $scope.estagios.find(filter_function).value : 'corte_raso';
    $scope.estagio = $scope.estagios.filter(function(a){if(a.value==estagio)return a;})[0];

    var estado = $rootScope.filters ? $rootScope.filters.estado : '';
    $scope.estado = estado;


    // $(".quick.quick-btn").hide();

    var estado = $scope.estado == '' ? 'AML' : $scope.estado;
    // $scope.prodesAno = $scope.mes > 6 ? $scope.ano + "-" ($scope.ano + 1).toString.substr(2) : ($scope.ano - 1) + "-" + $scope.ano.toString().substr(2);

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
          $scope.estado = a.name;
        }
      });
    };

    $scope.evaluateStage = function(stage, tipo, changeType) {
      if (typeof(changeType)==='undefined') changeType = false;

      if (changeType) {
        $scope.estagio = $scope.estagios.filter(function(a){if(a.value == 'corte_raso') return a;})[0];
        stage = $scope.estagio.value;
      }

      if(stage == 'deter_modis' || tipo != 'DETER'){
        $(".quick.quick-btn").show();
      } else {
        $(".quick.quick-btn").hide();
        $scope.changeClass($scope.estados.filter(function(a){if(a.name == '') return a;})[0]);
      }
    };

    $scope.getProperStage = function(key){
      switch(key){
        case 'degradacao':
          return "Degradação";
        case 'cicatriz_queimada':
          return 'Cicatriz de Queimada';
        case 'corte_raso':
          return 'Corte Raso';
        case 'mineracao':
          return 'Mineração';
        default:
          return key;
      }
    };

    $scope.addSeries = function(chart){
      chart.restOptions.frequencia = chart.restOptions.frequencia + 1;

      chart.loading = true;
      var promise = RestApi.query(chart.restOptions, chart.returnFunction).$promise;

      promise.then(chart.promise);
    };

    $scope.removeSeries = function(chart){
      if (chart.restOptions.frequencia > 0) {
        chart.restOptions.frequencia = chart.restOptions.frequencia - 1;

        chart.loading = true;
        var promise = RestApi.query(chart.restOptions, chart.returnFunction).$promise;
        
        promise.then(chart.promise);
      }
    };

    $scope.leftSeries = function(chart){
      chart.restOptions.indice = chart.restOptions.indice - 1;

      chart.loading = true;
      var promise = RestApi.query(chart.restOptions, chart.returnFunction).$promise;

      promise.then(chart.promise);
    };

    $scope.rightSeries = function(chart){
      chart.restOptions.indice = chart.restOptions.indice + 1;

      chart.loading = true;
      var promise = RestApi.query(chart.restOptions, chart.returnFunction).$promise;
      
      promise.then(chart.promise);
    };

    $scope.filter = function(estado,mes,ano,tipo,estagio) {
      var restChart1, restChart2, restChart3, restChart4, restChart5, restChart6, restChart7, restChart8, restChart9, restGauge1, restGauge2;

      var tipo_filtrado = (estagio.name != 'Degradação + Corte Raso' && tipo.value == 'DETER') ? 'DETER_QUALIF' : tipo.value;
      var estagio_filtrado = (estagio.name == 'Degradação + Corte Raso') ? '' : $scope.getProperStage(estagio.name);

      $scope.showPie1 = tipo_filtrado == 'DETER_QUALIF' ? false : true;
      $scope.showPie2 = tipo_filtrado == 'DETER_QUALIF' ? false : true;

      $rootScope.chart1 = {loading: true, tagId: 'chart1'};
      $rootScope.chart2 = {loading: true, addSeries: $scope.addSeries, removeSeries: $scope.removeSeries, tagId: 'chart2'};
      $rootScope.chart3 = {loading: true, addSeries: $scope.addSeries, removeSeries: $scope.removeSeries, tagId: 'chart3'};
      $rootScope.chart4 = {loading: true, addSeries: $scope.addSeries, removeSeries: $scope.removeSeries, tagId: 'chart4'};
      $rootScope.chart5 = {loading: true, tagId: 'chart5'};
      $rootScope.chart6 = {loading: true, rightSeries: $scope.rightSeries, leftSeries: $scope.leftSeries, tagId: 'chart6'};
      $rootScope.chart7 = {loading: true, addSeries: $scope.addSeries, removeSeries: $scope.removeSeries, tagId: 'chart7'};
      $rootScope.chart8 = {loading: true, rightSeries: $scope.rightSeries, leftSeries: $scope.leftSeries, showPie: $scope.showPie1, tagId: 'chart8'};
      $rootScope.chart9 = {loading: true, showPie: $scope.showPie2, tagId: 'chart9'};

      $rootScope.gauge1 = {loading: true, tooltip:"Variação em relação ao mesmo mês do ano anterior"};
      $rootScope.gauge2 = {loading: true, tooltip:"Variação em relação ao período PRODES anterior"};

      $rootScope.ano = $scope.ano;
      $rootScope.mes = $scope.mes;
      $rootScope.estado = $scope.estado;

      if ($cookies.get('user_data')){
        $http.defaults.headers.get = [];
        $http.defaults.headers.get['Authorization'] = 'Token ' + angular.fromJson($cookies.get('user_data')).token;
        $scope.logged = true;
      }

      $rootScope.gauge1.restOptions = {type:'comparativo', uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()};
      $rootScope.gauge1.returnFunction = restFunctions.gauge1;
      restGauge1 = RestApi.query($rootScope.gauge1.restOptions, $rootScope.gauge1.returnFunction).$promise;

      $rootScope.gauge2.restOptions = {type:'comparativo_prodes', uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()};
      $rootScope.gauge2.returnFunction = restFunctions.gauge2;
      restGauge2 = RestApi.query($rootScope.gauge2.restOptions, $rootScope.gauge2.returnFunction).$promise;

      $rootScope.chart1.restOptions = {type:'diario', uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()};
      $rootScope.chart1.returnFunction = restFunctions.chart1;
      restChart1 = RestApi.query($rootScope.chart1.restOptions, $rootScope.chart1.returnFunction).$promise;

      $rootScope.chart2.restOptions = {type:'mensal', uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim(), frequencia: 0};
      $rootScope.chart2.returnFunction = restFunctions.chart2;
      restChart2 = RestApi.query($rootScope.chart2.restOptions, $rootScope.chart2.returnFunction).$promise;

      $rootScope.chart3.restOptions = {type:'indice', uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim(), frequencia: 0};
      $rootScope.chart3.returnFunction = restFunctions.chart3;
      restChart3 = RestApi.query($rootScope.chart3.restOptions, $rootScope.chart3.returnFunction).$promise;

      $rootScope.chart4.restOptions = {type:'uf', uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim(), frequencia: 0};
      $rootScope.chart4.returnFunction = restFunctions.chart4;
      restChart4 = RestApi.query($scope.chart4.restOptions, $scope.chart4.returnFunction).$promise;

      $rootScope.chart5.restOptions = {type:'acumulado', uf: $scope.estado.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()};
      $rootScope.chart5.returnFunction = restFunctions.chart5;
      restChart5 = RestApi.query($rootScope.chart5.restOptions, $rootScope.chart5.returnFunction).$promise;

      $rootScope.chart6.restOptions = {type:'uf_comparativo', ano: $scope.ano, mes: $scope.mes.value.trim(), uf: $scope.estado.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim(), indice: 0};
      $rootScope.chart6.returnFunction = restFunctions.chart6;
      restChart6 = RestApi.query($rootScope.chart6.restOptions, $rootScope.chart6.returnFunction).$promise;

      $rootScope.chart7.restOptions = {type:'nuvens', ano: $scope.ano, mes: $scope.mes.value.trim(), uf: $scope.estado.trim(), frequencia: 0};
      $rootScope.chart7.returnFunction = restFunctions.chart7;
      restChart7 = RestApi.query($rootScope.chart7.restOptions, $rootScope.chart7.returnFunction).$promise;

      $rootScope.chart8.restOptions = {type:'uf_periodo', ano: $scope.ano, mes: $scope.mes.value.trim(), uf: $scope.estado.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim(), indice: 0};
      $rootScope.chart8.returnFunction = restFunctions.chart8;
      restChart8 = RestApi.query($rootScope.chart8.restOptions, $rootScope.chart8.returnFunction).$promise;

      $rootScope.chart9.restOptions = {type:'uf_mes_periodo', ano: $scope.ano, mes: $scope.mes.value.trim(), uf: $scope.estado.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()};
      $rootScope.chart9.returnFunction = restFunctions.chart9;
      restChart9 = RestApi.query($rootScope.chart9.restOptions, $rootScope.chart9.returnFunction).$promise;

      $rootScope.filters = {uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo.value.trim(), estagio: estagio_filtrado.trim()};

      $rootScope.chart10 = {};
      $rootScope.chart10.data = [[0,0,0],[-10,20,-30],[10,-20,30]];
      $rootScope.chart10.label = [1,2,3];
      $rootScope.chart10.series = ['zero','a','b'];


      $rootScope.gauge1.promise = function(){
        $rootScope.gauge1.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado;
        $rootScope.gauge1.title = "VRMMAA";
      }
      restGauge1.then($rootScope.gauge1.promise);

      $rootScope.gauge2.promise = function(){
        $rootScope.gauge2.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado;
        $rootScope.gauge2.title = "VRPPA";
      }
      restGauge2.then($rootScope.gauge2.promise);

      $rootScope.chart1.promise = function(){
        $rootScope.chart1.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado;
        $rootScope.chart1.title = 'Alerta ' + $scope.tipo.value + ": Detecção Diário em Km² [Filtros: " + $scope.mes.name + " / " + $scope.ano + " / Degradação + Corte Raso / " + estado + "]";
      }
      restChart1.then($rootScope.chart1.promise);

      $rootScope.chart2.promise = function(){
        $rootScope.chart2.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado;
        $rootScope.chart2.title = 'Alerta ' + $scope.tipo.value + ": Detecção Mensal em Km² [Filtros: " + $scope.ano + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + " / " + estado + "]";
      }
      restChart2.then($rootScope.chart2.promise);

      $rootScope.chart3.promise = function(){
        $rootScope.chart3.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado;
        $rootScope.chart3.title = 'Alerta ' + $scope.tipo.value + ": Detecção Períodos [Filtros: " + $scope.mes.name + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + " / " + estado + "]";
        // $scope.loadingBarChart1 = 'Alerta ' + $scope.tipo.value + ": Índice Períodos [Filtros: " + $scope.mes.name + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + " / " + estado + "]";
      }
      restChart3.then($rootScope.chart3.promise);
      
      $rootScope.chart4.promise = function(){
        $rootScope.chart4.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado;
        $rootScope.chart4.title = 'Alerta ' + $scope.tipo.value + ": UFs [Filtros: " + $scope.mes.name + " / "  + $scope.ano + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + " / " + estado + "]";
      }
      restChart4.then($rootScope.chart4.promise);

      $rootScope.chart5.promise = function(){
        $rootScope.chart5.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado;
        $rootScope.chart5.title = "Taxa PRODES | Alerta DETER | Alerta AWIFS: Acumulado Períodos [Filtros: " + estado + "]";
      }
      restChart5.then($rootScope.chart5.promise);
      
      $rootScope.chart6.promise = function(){
        $rootScope.chart6.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado;
        var anoProdes = $scope.mes.value > 7 ? $scope.ano : ($scope.ano - 1);

        $rootScope.chart6.title = "Taxa PRODES | Alerta DETER | Alerta AWIFS: UFs [Filtros: " + (anoProdes + $scope.chart6.restOptions.indice) + "-" + (anoProdes + 1 + $scope.chart6.restOptions.indice) + " / " + estado + "]";
      }
      restChart6.then($rootScope.chart6.promise);

      $rootScope.chart7.promise = function(){
        $rootScope.chart7.loading = false;

        $rootScope.chart7.title = "Alerta DETER: Taxa(%) de Nuvens";
      }
      restChart7.then($rootScope.chart7.promise);

      $rootScope.chart8.promise = function(){
        $rootScope.chart8.loading = false;

        var anoProdes = $scope.mes.value > 7 ? $scope.ano : ($scope.ano - 1);

        $rootScope.chart8.title = (anoProdes + $scope.chart8.restOptions.indice) + "-" + (anoProdes + 1 + $scope.chart8.restOptions.indice) + " [Filtros: " + $scope.tipo.value  + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + "]";
      }
      restChart8.then($rootScope.chart8.promise);

      $rootScope.chart9.promise = function(){
        $rootScope.chart9.loading = false;

        $rootScope.chart9.title = $scope.mes.name.substr(0,3) + ", " + $scope.ano  + " [Filtros: " + $scope.tipo.value  + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + "]";
      }
      restChart9.then($rootScope.chart9.promise);
    };
    
    if (!$rootScope.chart1) {
      $scope.filter($scope.estado,$scope.mes,$scope.ano,$scope.tipo,$scope.estagio);
    }

    $scope.evaluateStage($scope.estagio.value, $scope.tipo.value, true);

  });