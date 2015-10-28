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
    $scope.estagio = $scope.estagios.filter(function(a){if(a.value=='corte_raso')return a})[0];
    $scope.estado = '';

    $(".quick.quick-btn").hide()


    var estado = $scope.estado == '' ? 'AML' : $scope.estado

    // $scope.chart1Title = "Alerta " + $scope.tipo.value + ": Índice Diário [" + $scope.mes.name + " / " + $scope.ano + " / " + $scope.estagio.name + " / " + estado + "]";
    // $scope.chart2Title = "Alerta " + $scope.tipo.value + ": Índice Mensal em Km² [" + $scope.ano + " / " + $scope.estagio.name + "]";
    // $scope.chart3Title = "Alerta DETER: Índice Diário [" + $scope.mes.name + "]";
    // $scope.chart4Title = "Alerta DETER: Índice Diário [" + $scope.mes.name + "]";
    // $scope.chart5Title = "Alerta DETER: Índice Diário [" + $scope.mes.name + "]";


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

    $scope.evaluateStage = function(stage, tipo) {

      if(stage == 'deter_modis' || tipo != 'DETER'){
        $(".quick.quick-btn").show()
      } else {
        $(".quick.quick-btn").hide()
        $scope.changeClass($scope.estados.filter(function(a){if(a.name == '') return a})[0])
      }

    }

    // $scope.disableStates = function() {
    //   $(".quick.quick-btn").hide()
    // };
    // $scope.enableStates = function() {
    //   $(".quick.quick-btn").show()
    // };



    var restChart1, restChart2, restChart3, restChart4, restChart5, restChart6, restChart7, restChart8, restChart9;


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
          // obj.data[seriekey] = [0,0,0,0,0,0,0,0,0,0,0,0];
          obj.data[seriekey] = labels.map(function(a){return 0});
          angular.forEach(value.data,function(value, labelkey){
            // TODO: specific code, make it general
            // obj.data[seriekey][value[labelField] - 1] = value.total; 
            var lab = obj.labels.indexOf(value[labelField]);
            obj.data[seriekey][lab] = value.total; 
          });
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

        });

        obj.series = series;
      }

      return obj;
    }

    $scope.fillPieObject = function(obj, data, labels, labelField, series, serieField){

      var sum = 0;
      var ele = 0;

      obj.labels = labels;

      if (!series) {
        obj.data = labels.map(function(a){return 0});
        angular.forEach(data,function(value, key){
            var lab = obj.labels.indexOf(value[labelField]);
            obj.data[lab] = value.total; 
        });

        // while(labels[ele] <= labels[labels.length - 1]) {
        //   obj.data[0].push(sum);
        //   ele++
        // }
      } else {
        // TODO: work without series
        // angular.forEach(data, function(value,seriekey) {
        //   obj.data[seriekey] = labels.map(function(a){return 0});
        //   angular.forEach(value.data,function(value, labelkey){
        //     var lab = obj.labels.indexOf(value[labelField]);
        //     obj.data[seriekey][lab] = value.total; 
        //   });

        // });

        obj.series = series;
      }

      return obj;
    }

    $scope.relabel = function(object, newLabels) {
      object.labels = newLabels;
      return object;
    }

    $scope.filter = function(estado,mes,ano,tipo,estagio) {


      var tipo_filtrado = (estagio.name != 'Degradação + Corte Raso' && tipo.value == 'DETER') ? 'DETER_QUALIF' : tipo.value;
      var estagio_filtrado = (estagio.name == 'Degradação + Corte Raso') ? '' : $scope.getProperStage(estagio.name);

      $scope.showPie1 = tipo_filtrado == 'DETER_QUALIF' ? false : true;
      $scope.showPie2 = tipo_filtrado == 'DETER_QUALIF' ? false : true;

      $scope.chart1 = {loading: true};
      $scope.chart2 = {loading: true};
      $scope.chart3 = {loading: true};
      $scope.chart4 = {loading: true};
      $scope.chart5 = {loading: true};
      $scope.chart6 = {loading: true};
      $scope.chart7 = {loading: true};
      $scope.chart8 = {loading: true, showPie1: $scope.showPie1};
      $scope.chart9 = {loading: true, showPie2: $scope.showPie2};

      // $scope.loadingLineChart1 = true;
      // $scope.loadingLineChart2 = true;
      // $scope.loadingBarChart1 = true;
      // $scope.loadingBarChart2 = true;
      // $scope.loadingLineChart3 = true;
      // $scope.loadingBarChart3 = true;
      // $scope.loadingLineChart4 = true;
      // $scope.loadingPieChart1 = true;
      // $scope.loadingPieChart2 = true;

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
          // $scope.lineChart1 = returnedObject; 
          $scope.chart1.data = returnedObject; 


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
          var labels = [8,9,10,11,12,1,2,3,4,5,6,7];
          var series = [];

          angular.forEach(data, function(value,key){
            if (series.indexOf(value.periodo) == -1) {
              series.push(value.periodo);
            }
          });

          var returnedObject = $scope.fillLineObject(ret, data, labels, 'mes_id', series,'periodo');

          // $scope.lineChart2 = $scope.relabel(returnedObject,['Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai','Jun','Jul']);
          $scope.chart2.data = $scope.relabel(returnedObject,['Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai','Jun','Jul']);


      }).$promise;

      restChart3 = RestApi.query({type:'indice', uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()}, function success(data,status){
    
          var ret = {};
          ret.labels = [];
          ret.data = [];
          ret.data[0] = [];
          var labels = [];

          var lastDay = new Date($scope.ano,($scope.mes.value),0).getDate();

          var series = [];

          angular.forEach(data, function(value,key){
            if (series.indexOf(value.tipo) == -1) {
              series.push(value.tipo);
            }
            angular.forEach(value.data, function(v,k){
              if (labels.indexOf(v.periodo) == -1) {
                labels.push(v.periodo);
              }
            });
          });

          labels.sort(function(a,b){return a-b});

          var returnedObject = $scope.fillBarObject(ret, data, labels, 'periodo', series,'tipo');
          // $scope.barChart1 = returnedObject;
          $scope.chart3.data = returnedObject;


      }).$promise;

      restChart4 = RestApi.query({type:'uf', uf: $scope.estado.trim(), ano: $scope.ano, mes: $scope.mes.value.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()}, function success(data,status){
    
          var ret = {};
          ret.labels = [];
          ret.data = [];
          ret.data[0] = [];
          var labels = [];

          if ($scope.estado != '')
            labels.push($scope.estado.trim());
          else 
            labels = ['AC','AM','AP','MA','MT','PA','RO','RR','TO'];

          var series = [];

          angular.forEach(data, function(value,key){
            if (series.indexOf(value.periodo) == -1) {
              series.push(value.periodo);
            }
          });

          labels.sort(function(a,b){return a-b});

          var returnedObject = $scope.fillBarObject(ret, data, labels, 'estado', series,'periodo');
          // $scope.barChart2 = returnedObject;
          $scope.chart4.data = returnedObject;


      }).$promise;

      restChart5 = RestApi.query({type:'acumulado', uf: $scope.estado.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()}, function success(data,status){
    
          var ret = {};
          ret.labels = [];
          ret.data = [];
          ret.data[0] = [];
          var labels = [];

          var lastDay = new Date($scope.ano,($scope.mes.value),0).getDate();

          var series = [];

          angular.forEach(data, function(value,key){
            if (series.indexOf(value.taxa) == -1) {
              series.push(value.taxa);
            }
            angular.forEach(value.data, function(v,k){
              if (labels.indexOf(v.periodo_prodes) == -1) {
                labels.push(v.periodo_prodes);
              }
            });
          });

          labels.sort(function(a,b){return a>b});

          var returnedObject = $scope.fillLineObject(ret, data, labels, 'periodo_prodes', series,'taxa');
          // $scope.lineChart3 = returnedObject;
          $scope.chart5.data = returnedObject;


      }).$promise;

      restChart6 = RestApi.query({type:'uf_comparativo', ano: $scope.ano, mes: $scope.mes.value.trim(), uf: $scope.estado.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()}, function success(data,status){
    
          var ret = {};
          ret.labels = [];
          ret.data = [];
          ret.data[0] = [];
          var labels = [];

          if ($scope.estado != '')
            labels.push($scope.estado.trim());
          else 
            labels = ['AC','AM','AP','MA','MT','PA','RO','RR','TO'];

          var series = [];

          angular.forEach(data, function(value,key){
            if (series.indexOf(value.taxa) == -1) {
              series.push(value.taxa);
            }
          });

          labels.sort(function(a,b){return a>b});

          var returnedObject = $scope.fillBarObject(ret, data, labels, 'estado', series,'taxa');
          // $scope.barChart3 = returnedObject;
          $scope.chart6.data = returnedObject;


      }).$promise;

      restChart7 = RestApi.query({type:'nuvens', ano: $scope.ano, mes: $scope.mes.value.trim(), uf: $scope.estado.trim()}, function success(data,status){
    
          var ret = {};
          ret.labels = [];
          ret.data = [];
          ret.data[0] = [];
          var labels = [];

          var labels = [8,9,10,11,12,1,2,3,4,5,6,7];

          var series = [];

          angular.forEach(data, function(value,key){
            if (series.indexOf(value.taxa) == -1) {
              series.push(value.taxa);
            }
          });

          var returnedObject = $scope.fillLineObject(ret, data, labels, 'mes', series,'taxa');
          // $scope.lineChart4 = $scope.relabel(returnedObject,['Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai','Jun','Jul']);
          $scope.chart7.data = $scope.relabel(returnedObject,['Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai','Jun','Jul']);


      }).$promise;

      restChart8 = RestApi.query({type:'uf_periodo', ano: $scope.ano, mes: $scope.mes.value.trim(), uf: $scope.estado.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()}, function success(data,status){
    
          var ret = {};
          ret.labels = [];
          ret.data = [];
          var labels = [];

          if ($scope.estado != '')
            labels.push($scope.estado.trim());
          else 
            labels = ['AC','AM','AP','MA','MT','PA','RO','RR','TO'];

          var series = [];

          angular.forEach(data, function(value,key){
            if (series.indexOf(value.taxa) == -1) {
              series.push(value.taxa);
            }
          });

          var returnedObject = $scope.fillPieObject(ret, data[0].data, labels, 'estado');
          // $scope.pieChart1 = returnedObject;
          $scope.chart8.data = returnedObject;


      }).$promise;

      restChart9 = RestApi.query({type:'uf_mes_periodo', ano: $scope.ano, mes: $scope.mes.value.trim(), uf: $scope.estado.trim(), tipo: tipo_filtrado.trim(), estagio: estagio_filtrado.trim()}, function success(data,status){
    
          var ret = {};
          ret.labels = [];
          ret.data = [];
          var labels = [];

          if ($scope.estado != '')
            labels.push($scope.estado.trim());
          else 
            labels = ['AC','AM','AP','MA','MT','PA','RO','RR','TO'];

          var series = [];

          angular.forEach(data, function(value,key){
            if (series.indexOf(value.taxa) == -1) {
              series.push(value.taxa);
            }
          });

          var returnedObject = $scope.fillPieObject(ret, data[0].data, labels, 'estado');
          // $scope.pieChart2 = returnedObject;
          $scope.chart9.data = returnedObject;


      }).$promise;

      restChart1.then(function(){
        $scope.chart1.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado
        $scope.chart1.title = 'Alerta ' + $scope.tipo.value + ": Índice Diário [Filtros: " + $scope.mes.name + " / " + $scope.ano + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + " / " + estado + "]";
      });
      restChart2.then(function(){
        $scope.chart2.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado
        $scope.chart2.title = 'Alerta ' + $scope.tipo.value + ": Índice Mensal em Km² [Filtros: " + $scope.ano + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + " / " + estado + "]";
        // $scope.chart2Title = "Alerta " + $scope.tipo.value +": Índice Diário [" + $scope.mes.name + " - " + $scope.ano + " - " + $scope.estagio.name + "]";
      });
      restChart3.then(function(){
        $scope.chart3.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado
        $scope.chart3.title = 'Alerta ' + $scope.tipo.value + ": Índice Períodos [Filtros: " + $scope.mes.name + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + " / " + estado + "]";
        // $scope.loadingBarChart1 = 'Alerta ' + $scope.tipo.value + ": Índice Períodos [Filtros: " + $scope.mes.name + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + " / " + estado + "]";
      });
      restChart4.then(function(){
        $scope.chart4.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado
        $scope.chart4.title = 'Alerta ' + $scope.tipo.value + ": UFs [Filtros: " + $scope.mes.name + " / "  + $scope.ano + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + " / " + estado + "]";
        // $scope.chart4Title = 'Alerta ' + $scope.tipo.value + ": UFs [Filtros: " + $scope.mes.name + " / "  + $scope.ano + " / " + $scope.estagio.name.replace(/\s\+\s/g,'+') + " / " + estado + "]";
      });
      restChart5.then(function(){
        $scope.chart5.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado
        $scope.chart5.title = "Taxa PRODES | Alerta DETER | Alerta AWIFS: Acumulado Períodos [Filtros: " + estado + "]";
        // $scope.chart5Title = "Taxa PRODES | Alerta DETER | Alerta AWIFS: Acumulado Períodos [Filtros: " + estado + "]";
      });
      restChart6.then(function(){
        $scope.chart6.loading = false;

        var estado = $scope.estado == '' ? 'AML' : $scope.estado
        $scope.chart6.title = "Taxa PRODES | Alerta DETER | Alerta AWIFS: UFs [Filtros: 2014-2015 / " + estado + "]";
        // $scope.chart6Title = "Taxa PRODES | Alerta DETER | Alerta AWIFS: UFs [Filtros: 2014-2015 / " + estado + "]";
      });
      restChart7.then(function(){
        $scope.chart7.loading = false;

        $scope.chart7.title = "Alerta DETER: Taxa(%) de Nuvens";
        // $scope.chart7Title = "Alerta DETER: Taxa(%) de Nuvens";
      });
      restChart8.then(function(){
        $scope.chart8.loading = false;

        $scope.chart8.title = $scope.prodesAno;
        // $scope.chart8Title = $scope.prodesAno;
      });
      restChart9.then(function(){
        $scope.chart9.loading = false;

        $scope.chart9.title = $scope.mes.name.substr(0,3) + ", " + $scope.ano;
        // $scope.chart9Title = $scope.mes.name.substr(0,3) + ", " + $scope.ano;
      });

    };


    // $scope.lineChart1 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87']]};
    // $scope.lineChart2 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87'],['240.92','94.32','3.78','1149.32','150.42','390.89','681.95','7.85']], 'series':['2014-2015','2013-2014']};
    // $scope.lineChart3 = {'labels':['2007-2008','2008-2009','2009-2010','2010-2011','2011-2012','2012-2013','2013-2014','2014-2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87'],['240.92','94.32','3.78','1149.32','150.42','390.89','681.95','7.85']], 'series':['2014-2015','2013-2014']};
    // $scope.lineChart4 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87'],['240.92','94.32','3.78','1149.32','150.42','390.89','681.95','7.85']], 'series':['2014-2015','2013-2014']};


    // $scope.stackedBarChart1 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87'],['240.92','94.32','3.78','1149.32','390.89','681.95','7.85','152.87']], 'series':['Alerta DETER','Taxa TESTE']};

    // $scope.barChart1 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['94.32','240.92','3.78','150.42','1149.32','681.95','390.89','152.87','7.85'],['240.92','94.32','3.78','1149.32','150.42','390.89','681.95','7.85','152.87']], 'series':['Alerta DETER','Taxa PRODES']};
    // $scope.barChart2 = {'labels':['2008','2009','2010','2011','2012','2013','2014','2015'],'data':[['150.42','152.87','94.32','3.78','7.85','1149.32','390.89','681.95','240.92'],['240.92','94.32','3.78','1149.32','150.42','390.89','681.95','7.85','152.87']], 'series':['Alerta DETER','Taxa PRODES']};
    
    // $scope.pieChart1 = {'labels':['AC','AM','MA','MT','PA','RO','RR','TO','Outro'],'data':[94.32,240.92,3.78,15.42,1149.32,681.95,390.89,152.87,7.85]};
    // $scope.pieChart2 = {'labels':['AC','AM','MA','MT','PA','RO','RR','TO','Outro'],'data':[94.32,240.92,3.78,15.42,1149.32,681.95,390.89,152.87,7.85]};
    // RestApi.query({query:"public_daily"}, function success(data,status){
    //     console.log(data);
    // });

    
    $scope.filter($scope.estado,$scope.mes,$scope.ano,$scope.tipo,$scope.estagio);

  });

