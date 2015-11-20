'use strict';

/**
 * @ngdoc function
 * @name estatisticasApp.controller:ChartsCtrl
 * @description
 * # ChartsCtrl
 * Controller of the estatisticasApp
 */

angular.module('estatisticasApp')
  .controller('ChartsCtrl', function ($scope, $rootScope, formData, RestApi, restFunctions) {
    $rootScope.mapView = false;
    $rootScope.today = new Date();

    $scope.meses = formData.meses;
    $scope.anos = formData.anos;
    $scope.estados = formData.estados;
    $scope.tipos = formData.tipos;
    $scope.estagios = formData.estagios;

    $scope.mes = $scope.meses[new Date().getMonth()];
    $scope.ano = new Date().getFullYear();
    $scope.tipo = $scope.tipos.filter(function(a){if(a.value=='DETER')return a})[0];
    $scope.estagio = $scope.estagios.filter(function(a){if(a.value=='corte_raso')return a})[0];
    $scope.estado = '';

    $(".quick.quick-btn").hide();

    var estado = $scope.estado == '' ? 'AML' : $scope.estado
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
          $scope.estado = a.name;
        }
      });
    };

    $scope.evaluateStage = function(stage, tipo, changeType=false) {
      if (changeType) {
        $scope.estagio = $scope.estagios.filter(function(a){if(a.value == 'corte_raso') return a})[0]
        stage = $scope.estagio.value
      }

      if(stage == 'deter_modis' || tipo != 'DETER'){
        $(".quick.quick-btn").show()
      } else {
        $(".quick.quick-btn").hide()
        $scope.changeClass($scope.estados.filter(function(a){if(a.name == '') return a})[0])
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
      var restChart1, restChart2, restChart3, restChart4, restChart5, restChart6, restChart7, restChart8, restChart9;

      var tipo_filtrado = (estagio.name != 'Degradação + Corte Raso' && tipo.value == 'DETER') ? 'DETER_QUALIF' : tipo.value;
      var estagio_filtrado = (estagio.name == 'Degradação + Corte Raso') ? '' : $scope.getProperStage(estagio.name);

      $scope.showPie1 = tipo_filtrado == 'DETER_QUALIF' ? false : true;
      $scope.showPie2 = tipo_filtrado == 'DETER_QUALIF' ? false : true;

      $rootScope.chart1 = {loading: true};
      $rootScope.chart2 = {loading: true, addSeries: $scope.addSeries, removeSeries: $scope.removeSeries};
      $rootScope.chart3 = {loading: true, addSeries: $scope.addSeries, removeSeries: $scope.removeSeries};
      $rootScope.chart4 = {loading: true, addSeries: $scope.addSeries, removeSeries: $scope.removeSeries};
      $rootScope.chart5 = {loading: true};
      $rootScope.chart6 = {loading: true, rightSeries: $scope.rightSeries, leftSeries: $scope.leftSeries};
      $rootScope.chart7 = {loading: true, addSeries: $scope.addSeries, removeSeries: $scope.removeSeries};
      $rootScope.chart8 = {loading: true, rightSeries: $scope.rightSeries, leftSeries: $scope.leftSeries, showPie: $scope.showPie1};
      $rootScope.chart9 = {loading: true, showPie: $scope.showPie2};

      $rootScope.ano = $scope.ano
      $rootScope.mes = $scope.mes
      $rootScope.estado = $scope.estado

      // $rootScope.chart1.returnFunction = function success(data,status){
    
      //     var ret = {};
      //     ret.labels = [];
      //     ret.data = [];
      //     ret.data[0] = [];


      //     data[0].data.sort(function(a,b){
      //       return a.dia-b.dia;
      //     });

      //     var lastDay = new Date($scope.ano,($scope.mes.value),0).getDate();
      //     var labels = [];

      //     for ( var i = 1; i <= lastDay; i++) {
      //       labels.push(i);
      //     };

      //     var returnedObject = $scope.fillLineObject(ret, data[0].data, labels, 'dia');
      //     // $scope.lineChart1 = returnedObject; 
      //     $scope.chart1.data = returnedObject; 


      // }
      $rootScope.chart1.restOptions = {type:'diario', uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()}
      $rootScope.chart1.returnFunction = restFunctions.chart1;
      restChart1 = RestApi.query($rootScope.chart1.restOptions, $rootScope.chart1.returnFunction).$promise;

      // $rootScope.chart2.returnFunction = function success(data,status){
    
      //     var ret = {};
      //     ret.labels = [];
      //     ret.data = [];
      //     ret.data[0] = [];


      //     // data[0].data.sort(function(a,b){
      //     //   return a.dia-b.dia;
      //     // });

      //     var lastDay = new Date($scope.ano,($scope.mes.value),0).getDate();
      //     var labels = [8,9,10,11,12,1,2,3,4,5,6,7];
      //     var series = [];

      //     angular.forEach(data, function(value,key){
      //       if (series.indexOf(value.periodo) == -1) {
      //         series.push(value.periodo);
      //       }
      //     });

      //     var returnedObject = $scope.fillLineObject(ret, data, labels, 'mes_id', series,'periodo');

      //     // $scope.lineChart2 = $scope.relabel(returnedObject,['Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai','Jun','Jul']);
      //     $scope.chart2.data = $scope.relabel(returnedObject,['Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai','Jun','Jul']);

      // }
      $rootScope.chart2.restOptions = {type:'mensal', uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim(), frequencia: 0}
      $rootScope.chart2.returnFunction = restFunctions.chart2;
      restChart2 = RestApi.query($rootScope.chart2.restOptions, $rootScope.chart2.returnFunction).$promise;


      // restChart2 = RestApi.query($scope.chart2.restOptions, $scope.chart2.returnFunction).$promise;

      // $scope.chart3.returnFunction = function success(data,status){
    
      //     var ret = {};
      //     ret.labels = [];
      //     ret.data = [];
      //     ret.data[0] = [];
      //     var labels = [];

      //     var lastDay = new Date($scope.ano,($scope.mes.value),0).getDate();

      //     var series = [];

      //     angular.forEach(data, function(value,key){
      //       if (series.indexOf(value.tipo) == -1) {
      //         series.push(value.tipo);
      //       }
      //       angular.forEach(value.data, function(v,k){
      //         if (labels.indexOf(v.periodo) == -1) {
      //           labels.push(v.periodo);
      //         }
      //       });
      //     });

      //     labels.sort(function(a,b){return a-b});

      //     var returnedObject = $scope.fillBarObject(ret, data, labels, 'periodo', series,'tipo');
      //     // $scope.barChart1 = returnedObject;
      //     $scope.chart3.data = returnedObject;


      // };
      $rootScope.chart3.restOptions = {type:'indice', uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim(), frequencia: 0}
      $rootScope.chart3.returnFunction = restFunctions.chart3;
      restChart3 = RestApi.query($rootScope.chart3.restOptions, $rootScope.chart3.returnFunction).$promise;

      // $rootScope.chart4.returnFunction = function success(data,status){
    
      //     var ret = {};
      //     ret.labels = [];
      //     ret.data = [];
      //     ret.data[0] = [];
      //     var labels = [];

      //     if ($scope.estado != '')
      //       labels.push($scope.estado.trim());
      //     else 
      //       labels = ['AC','AM','AP','MA','MT','PA','RO','RR','TO'];

      //     var series = [];

      //     angular.forEach(data, function(value,key){
      //       if (series.indexOf(value.periodo) == -1) {
      //         series.push(value.periodo);
      //       }
      //     });

      //     labels.sort(function(a,b){return a-b});

      //     var returnedObject = $scope.fillBarObject(ret, data, labels, 'estado', series,'periodo');
      //     // $scope.barChart2 = returnedObject;
      //     $scope.chart4.data = returnedObject;
      //     // $scope.chart4.data = {'labels':['2010','2011','2012','2013','2014','2015'],'data':[['150.42','1149.32','681.95','390.89','152.87','7.85'],['1149.32','150.42','390.89','681.95','7.85','152.87']], 'series':['Alerta DETER','Taxa PRODES']};


      // };
      $rootScope.chart4.restOptions = {type:'uf', uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim(), frequencia: 0}
      $rootScope.chart4.returnFunction = restFunctions.chart4;
      restChart4 = RestApi.query($scope.chart4.restOptions, $scope.chart4.returnFunction).$promise;

      // $scope.chart5.returnFunction = function success(data,status){
    
      //     var ret = {};
      //     ret.labels = [];
      //     ret.data = [];
      //     ret.data[0] = [];
      //     var labels = [];

      //     var lastDay = new Date($scope.ano,($scope.mes.value),0).getDate();

      //     var series = [];

      //     angular.forEach(data, function(value,key){
      //       if (series.indexOf(value.taxa) == -1) {
      //         series.push(value.taxa);
      //       }
      //       angular.forEach(value.data, function(v,k){
      //         if (labels.indexOf(v.periodo_prodes) == -1) {
      //           labels.push(v.periodo_prodes);
      //         }
      //       });
      //     });

      //     labels.sort(function(a,b){return a>b});

      //     var returnedObject = $scope.fillLineObject(ret, data, labels, 'periodo_prodes', series,'taxa');
      //     // $scope.lineChart3 = returnedObject;
      //     $scope.chart5.data = returnedObject;


      // }
      $rootScope.chart5.restOptions = {type:'acumulado', uf: $scope.estado.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()}
      $rootScope.chart5.returnFunction = restFunctions.chart5;
      restChart5 = RestApi.query($rootScope.chart5.restOptions, $rootScope.chart5.returnFunction).$promise;

      // $scope.chart6.returnFunction = function success(data,status){
    
      //     var ret = {};
      //     ret.labels = [];
      //     ret.data = [];
      //     ret.data[0] = [];
      //     var labels = [];

      //     if ($scope.estado != '')
      //       labels.push($scope.estado.trim());
      //     else 
      //       labels = ['AC','AM','AP','MA','MT','PA','RO','RR','TO'];

      //     var series = [];

      //     angular.forEach(data, function(value,key){
      //       if (series.indexOf(value.taxa) == -1) {
      //         series.push(value.taxa);
      //       }
      //     });

      //     labels.sort(function(a,b){return a>b});

      //     var returnedObject = $scope.fillBarObject(ret, data, labels, 'estado', series,'taxa');
      //     // $scope.barChart3 = returnedObject;
      //     $scope.chart6.data = returnedObject;


      // }
      $rootScope.chart6.restOptions = {type:'uf_comparativo', ano: $scope.ano, mes: $scope.mes.value.trim(), uf: $scope.estado.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim(), indice: 0}
      $rootScope.chart6.returnFunction = restFunctions.chart6
      restChart6 = RestApi.query($rootScope.chart6.restOptions, $rootScope.chart6.returnFunction).$promise;

      // $scope.chart7.returnFunction = function success(data,status){
    
      //     var ret = {};
      //     ret.labels = [];
      //     ret.data = [];
      //     ret.data[0] = [];
      //     var labels = [];

      //     var labels = [8,9,10,11,12,1,2,3,4,5,6,7];

      //     var series = [];

      //     angular.forEach(data, function(value,key){
      //       if (series.indexOf(value.taxa) == -1) {
      //         series.push(value.taxa);
      //       }
      //     });

      //     var returnedObject = $scope.fillLineObject(ret, data, labels, 'mes', series,'taxa');
      //     // $scope.lineChart4 = $scope.relabel(returnedObject,['Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai','Jun','Jul']);
      //     $scope.chart7.data = $scope.relabel(returnedObject,['Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai','Jun','Jul']);


      // };
      $rootScope.chart7.restOptions = {type:'nuvens', ano: $scope.ano, mes: $scope.mes.value.trim(), uf: $scope.estado.trim(), frequencia: 0}
      $rootScope.chart7.returnFunction = restFunctions.chart7;
      restChart7 = RestApi.query($rootScope.chart7.restOptions, $rootScope.chart7.returnFunction).$promise;

      // $scope.chart8.returnFunction = function success(data,status){
    
      //     var ret = {};
      //     ret.labels = [];
      //     ret.data = [];
      //     var labels = [];
      //     var states = ['AC','AM','AP','MA','MT','PA','RO','RR','TO'];

      //     // if ($scope.estado != '') {
      //     //   labels.push($scope.estado.trim());
      //     // } else {
      //       labels = data[0].data.map(function(d){ return d.estado});
      //       states.map(function(s){if (labels.indexOf(s) == -1) labels.push(s);});
      //     // }

      //     var series = [];

      //     angular.forEach(data, function(value,key){
      //       if (series.indexOf(value.taxa) == -1) {
      //         series.push(value.taxa);
      //       }
      //     });

      //     var returnedObject = $scope.fillPieObject(ret, data[0].data, labels, 'estado');
      //     // $scope.pieChart1 = returnedObject;
      //     $scope.chart8.data = returnedObject;


      // }
      $rootScope.chart8.restOptions = {type:'uf_periodo', ano: $scope.ano, mes: $scope.mes.value.trim(), uf: $scope.estado.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim(), indice: 0}
      $rootScope.chart8.returnFunction = restFunctions.chart8
      restChart8 = RestApi.query($rootScope.chart8.restOptions, $rootScope.chart8.returnFunction).$promise;

      // $scope.chart9.returnFunction = function success(data,status){
    
      //     var ret = {};
      //     ret.labels = [];
      //     ret.data = [];
      //     var labels = [];
      //     var states = ['AC','AM','AP','MA','MT','PA','RO','RR','TO'];

      //     // if ($scope.estado != '') {
      //     //   labels.push($scope.estado.trim());
      //     // } else {
      //       labels = data[0].data.map(function(d){ return d.estado});
      //       states.map(function(s){if (labels.indexOf(s) == -1) labels.push(s);});
      //     // }

      //     var series = [];

      //     angular.forEach(data, function(value,key){
      //       if (series.indexOf(value.taxa) == -1) {
      //         series.push(value.taxa);
      //       }
      //     });

      //     var returnedObject = $scope.fillPieObject(ret, data[0].data, labels, 'estado');
      //     // $scope.pieChart2 = returnedObject;
      //     $scope.chart9.data = returnedObject;


      // }
      $rootScope.chart9.restOptions = {type:'uf_mes_periodo', ano: $scope.ano, mes: $scope.mes.value.trim(), uf: $scope.estado.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()}
      $rootScope.chart9.returnFunction = restFunctions.chart9;
      restChart9 = RestApi.query($rootScope.chart9.restOptions, $rootScope.chart9.returnFunction).$promise;

      $rootScope.chart1.promise = function(){
        $rootScope.chart1.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado
        $rootScope.chart1.title = 'Alerta ' + $scope.tipo.value + ": Índice Diário [Filtros: " + $scope.mes.name + " / " + $scope.ano + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + " / " + estado + "]";
      }
      restChart1.then($rootScope.chart1.promise);

      $rootScope.chart2.promise = function(){
        $rootScope.chart2.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado
        $rootScope.chart2.title = 'Alerta ' + $scope.tipo.value + ": Índice Mensal em Km² [Filtros: " + $scope.ano + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + " / " + estado + "]";
      }
      restChart2.then($rootScope.chart2.promise);

      $rootScope.chart3.promise = function(){
        $rootScope.chart3.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado
        $rootScope.chart3.title = 'Alerta ' + $scope.tipo.value + ": Índice Períodos [Filtros: " + $scope.mes.name + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + " / " + estado + "]";
        // $scope.loadingBarChart1 = 'Alerta ' + $scope.tipo.value + ": Índice Períodos [Filtros: " + $scope.mes.name + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + " / " + estado + "]";
      }
      restChart3.then($rootScope.chart3.promise);
      
      $rootScope.chart4.promise = function(){
        $rootScope.chart4.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado
        $rootScope.chart4.title = 'Alerta ' + $scope.tipo.value + ": UFs [Filtros: " + $scope.mes.name + " / "  + $scope.ano + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + " / " + estado + "]";
      }
      restChart4.then($rootScope.chart4.promise);

      $rootScope.chart5.promise = function(){
        $rootScope.chart5.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado
        $rootScope.chart5.title = "Taxa PRODES | Alerta DETER | Alerta AWIFS: Acumulado Períodos [Filtros: " + estado + "]";
      }
      restChart5.then($rootScope.chart5.promise);
      
      $rootScope.chart6.promise = function(){
        $rootScope.chart6.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado
        var anoProdes = $scope.mes.value > 7 ? $scope.ano : ($scope.ano - 1)

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

        var anoProdes = $scope.mes.value > 7 ? $scope.ano : ($scope.ano - 1)

        $rootScope.chart8.title = (anoProdes + $scope.chart8.restOptions.indice) + "-" + (anoProdes + 1 + $scope.chart8.restOptions.indice) + " [Filtros: " + $scope.tipo.value  + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + "]";
      }
      restChart8.then($rootScope.chart8.promise);

      $rootScope.chart9.promise = function(){
        $rootScope.chart9.loading = false;

        $rootScope.chart9.title = $scope.mes.name.substr(0,3) + ", " + $scope.ano  + " [Filtros: " + $scope.tipo.value  + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + "]";
      }
      restChart9.then($rootScope.chart9.promise);
    };
    
    $scope.filter($scope.estado,$scope.mes,$scope.ano,$scope.tipo,$scope.estagio);
  });