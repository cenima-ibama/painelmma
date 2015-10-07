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
    $rootScope.today = new Date();

    $scope.meses = formData.meses;
    $scope.anos = formData.anos;
    $scope.estados = formData.estados;
    $scope.tipos = formData.tipos;
    $scope.estagios = formData.estagios;

    $scope.mes = $scope.meses[new Date().getMonth()];
    $scope.ano = new Date().getFullYear();
    $scope.tipo = $scope.tipos.filter(function(a){if(a.value=='DETER')return a})[0];
    $scope.estagio = $scope.estagios.filter(function(a){if(a.value=='deter_modis')return a})[0];
    $scope.estado = '';

    $scope.lastFilter = {'mes': $scope.mes,'ano': $scope.ano,'tipo': $scope.tipo,'estagio': $scope.estagio,'estado': $scope.estado};


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


    var restChart1, restChart2, restChart3, restChart4;


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
    }

    $scope.fillLineObject = function(obj, data, labels, labelField, series, serieField){

      var sum = 0;
      var ele = 0;

      obj.labels = labels;

      if (!series) {
        angular.forEach(data,function(value, key){
          while (labels[ele] < value[labelField]) {
            obj.data[0].push(sum);
            ele++;  
          }
          sum += value.total;
          obj.data[0].push(sum);
          ele++;  
        });

        while(labels[ele] <= labels[labels.length - 1]) {
          obj.data[0].push(sum);
          ele++
        }
      } else {
        angular.forEach(data, function(value,seriekey) {
          // TODO: specific code, make it general
          obj.data[seriekey] = [0,0,0,0,0,0,0,0,0,0,0,0];
          angular.forEach(value.data,function(value, labelkey){
            // TODO: specific code, make it general
            obj.data[seriekey][value[labelField] - 1] = value.total; 
          });

          // TODO: specific code, make it general
          for(var i=0;i<7;i++) obj.data[seriekey].push(obj.data[seriekey].shift());

        });

        obj.series = series;
      }

      return obj;
    }

    $scope.fillBarObject = function(obj, data, labels, labelField, series, serieField){

      var sum = 0;
      var ele = 0;

      obj.labels = labels;

      if (!series) {
        // TODO: work without series
        // angular.forEach(data,function(value, key){
        //   while (labels[ele] < value[labelField]) {
        //     obj.data[0].push(sum);
        //     ele++;  
        //   }
        //   sum += value.total;
        //   obj.data[0].push(sum);
        //   ele++;  
        // });

        // while(labels[ele] <= labels[labels.length - 1]) {
        //   obj.data[0].push(sum);
        //   ele++
        // }
      } else {
        angular.forEach(data, function(value,seriekey) {
          obj.data[seriekey] = labels.map(function(a){return 0});
          angular.forEach(value.data,function(value, labelkey){
            var lab = obj.labels.indexOf(value[labelField]);
            obj.data[seriekey][lab] = value.total; 
          });

          // for(var i=0;i<7;i++) obj.data[seriekey].push(obj.data[seriekey].shift());

        });

        obj.series = series;
      }

      return obj;
    }

    $scope.relabel = function(object, newLabels) {
      object.labels = newLabels;
      return object;
    }

    $scope.filter = function(estado,mes,ano,tipo,estagio) {

      // lastFilter = {};


      var tipo_filtrado = (estagio != 'Degradação + Corte Raso' && tipo.value == 'DETER') ? 'DETER_QUALIF' : tipo.value;
      var estagio_filtrado = (estagio == 'Degradação + Corte Raso') ? '' : $scope.getProperStage(estagio);

      $scope.loadingLineChart1 = true;
      $scope.loadingLineChart2 = true;
      $scope.loadingBarChart1 = true;
      $scope.loadingBarChart2 = true;
      // console.log(estado + ', ' + mes.value + ', ' + ano + ', ' + tipo.value + ', ' + estagio.value);
      restChart1 = RestApi.query({type:'diario', uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()}, function success(data,status){
    
          var ret = {};
          ret.labels = [];
          ret.data = [];
          ret.data[0] = [];


          data[0].data.sort(function(a,b){
            return a.dia-b.dia;
          });

          var lastDay = new Date($scope.ano,($scope.mes.value),0).getDate();
          var labels = [];

          for ( var i = 1; i <= lastDay; i++) {
            labels.push(i);
          };

          var returnedObject = $scope.fillLineObject(ret, data[0].data, labels, 'dia');
          $scope.lineChart1 = returnedObject; 


      }).$promise;

      restChart2 = RestApi.query({type:'mensal', uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()}, function success(data,status){
    
          var ret = {};
          ret.labels = [];
          ret.data = [];
          ret.data[0] = [];


          // data[0].data.sort(function(a,b){
          //   return a.dia-b.dia;
          // });

          var lastDay = new Date($scope.ano,($scope.mes.value),0).getDate();
          // var labels = [1,2,3,4,5,6,7,8,9,10,11,12];
          var series = [];

          angular.forEach(data, function(value,key){
            if (series.indexOf(value.periodo) == -1) {
              series.push(value.periodo);
            }
          });

          var returnedObject = $scope.fillLineObject(ret, data, null, 'mes_id', series,'periodo');
          $scope.lineChart2 = $scope.relabel(returnedObject,['Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai','Jun','Jul']);


      }).$promise;

      restChart3 = RestApi.query({type:'indice', uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()}, function success(data,status){
    
          var ret = {};
          ret.labels = [];
          ret.data = [];
          ret.data[0] = [];
          var labels = [];

          var lastDay = new Date($scope.ano,($scope.mes.value),0).getDate();
          // if ($scope.estado != '')
          //   labels.push($scope.estado.trim());
          // else 
          //   labels = ['AC','AM','AP','MA','MT','PA','RO','RR','TO'];

          var series = [];

          angular.forEach(data, function(value,key){
            if (series.indexOf(value.periodo) == -1) {
              series.push(value.periodo);
            }
            angular.forEach(value.data, function(v,k){
              if (labels.indexOf(v.estado) == -1) {
                labels.push(v.estado);
              }
            });
          });

          labels.sort(function(a,b){return a-b});

          var returnedObject = $scope.fillBarObject(ret, data, labels, 'estado', series,'periodo');
          $scope.barChart1 = returnedObject;


      }).$promise;

      restChart4 = RestApi.query({type:'uf', uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()}, function success(data,status){
    
          var ret = {};
          ret.labels = [];
          ret.data = [];
          ret.data[0] = [];
          var labels = [];

          var lastDay = new Date($scope.ano,($scope.mes.value),0).getDate();
          if ($scope.estado != '')
            labels.push($scope.estado.trim());
          else 
            labels = ['AC','AM','AP','MA','MT','PA','RO','RR','TO'];

          var series = [];

          angular.forEach(data, function(value,key){
            if (series.indexOf(value.periodo) == -1) {
              series.push(value.periodo);
            }
            // angular.forEach(value.data, function(v,k){
            //   if (labels.indexOf(v.estado) == -1) {
            //     labels.push(v.estado);
            //   }
            // });
          });

          labels.sort(function(a,b){return a-b});

          var returnedObject = $scope.fillBarObject(ret, data, labels, 'estado', series,'periodo');
          $scope.barChart2 = returnedObject;


      }).$promise;

      restChart1.then(function(){
        $scope.loadingLineChart1 = false;
      });
      restChart2.then(function(){
        $scope.loadingLineChart2 = false;
      });
      restChart3.then(function(){
        $scope.loadingBarChart1 = false;
      });
      restChart4.then(function(){
        $scope.loadingBarChart2 = false;
      });

    };


    // $scope.lineChart1 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87']]};
    // $scope.lineChart2 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87'],['240.92','94.32','3.78','1149.32','150.42','390.89','681.95','7.85']], 'series':['2014-2015','2013-2014']};
    $scope.lineChart3 = {'labels':['2007-2008','2008-2009','2009-2010','2010-2011','2011-2012','2012-2013','2013-2014','2014-2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87'],['240.92','94.32','3.78','1149.32','150.42','390.89','681.95','7.85']], 'series':['2014-2015','2013-2014']};
    $scope.lineChart4 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87'],['240.92','94.32','3.78','1149.32','150.42','390.89','681.95','7.85']], 'series':['2014-2015','2013-2014']};


    // $scope.stackedBarChart1 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87'],['240.92','94.32','3.78','1149.32','390.89','681.95','7.85','152.87']], 'series':['Alerta DETER','Taxa TESTE']};

    // $scope.barChart1 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87','7.85'],['240.92','94.32','3.78','1149.32','150.42','390.89','681.95','7.85','152.87']], 'series':['Alerta DETER','Taxa PRODES']};
    // $scope.barChart2 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['150.42','152.87','94.32','3.78','7.85','1149.32','390.89','681.95','240.92'],['240.92','94.32','3.78','1149.32','150.42','390.89','681.95','7.85','152.87']], 'series':['Alerta DETER','Taxa PRODES']};
    
    $scope.pieChart1 = {'labels':['AC','AM','MA','MT','PA','RO','RR','TO','Outro'],'data':[94.32,240.92,3.78,15.42,1149.32,681.95,390.89,152.87,7.85]};
    $scope.pieChart2 = {'labels':['AC','AM','MA','MT','PA','RO','RR','TO','Outro'],'data':[94.32,240.92,3.78,15.42,1149.32,681.95,390.89,152.87,7.85]};
    // RestApi.query({query:"public_daily"}, function success(data,status){
    //     console.log(data);
    // });

    
    $scope.filter($scope.estado,$scope.mes,$scope.ano,$scope.tipo,$scope.estagio.name);

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

