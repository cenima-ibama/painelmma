'use strict';

/**
 * @ngdoc service
 * @name estatisticasApp.restFunctions
 * @description
 * # restFunctions
 * Service in the estatisticasApp.
 */
angular.module('estatisticasApp')
  .service('restFunctions', ['$rootScope', function ($rootScope) {

    var fillLineObject = function(obj, data, labels, labelField, series, serieField){
      var sum = 0;
      var ele = 0;

      obj.labels = labels;

      if (!series) {
        angular.forEach(data,function(value, key){
          while (labels[ele] < value[labelField]) {
            obj.data[0].push(parseFloat(sum).toFixed(2));
            ele++;  
          }
          sum += value.total;
          obj.data[0].push(parseFloat(sum).toFixed(2));
          ele++;  
        });
        while(labels[ele] <= labels[labels.length - 1]) {
          obj.data[0].push(parseFloat(sum).toFixed(2));
          ele++;
        }
      } else {
        angular.forEach(data, function(value,seriekey) {
          obj.data[seriekey] = labels.map(function(a){return 0;});
          angular.forEach(value.data,function(value, labelkey){
            var lab = obj.labels.indexOf(value[labelField]);
            obj.data[seriekey][lab] = parseFloat(value.total).toFixed(2); 
          });
        });
        obj.series = series;
      }
      return obj;
    };

    var fillBarObject = function(obj, data, labels, labelField, series, serieField){
      var sum = 0;
      var ele = 0;

      obj.labels = labels;

      if (!series) {
        // TODO: work without series
      } else {
        angular.forEach(data, function(value,seriekey) {
          obj.data[seriekey] = labels.map(function(a){return 0;});
          angular.forEach(value.data,function(value, labelkey){
            var lab = obj.labels.indexOf(value[labelField]);
            obj.data[seriekey][lab] = parseFloat(value.total).toFixed(2); 
          });
        });
        obj.series = series;
      }
      return obj;
    };

    var fillPieObject = function(obj, data, labels, labelField, series, serieField){
      var sum = 0;
      var ele = 0;

      obj.labels = labels;

      if (!series) {
        obj.data = labels.map(function(a){return 0;});
        angular.forEach(data,function(value, key){
            var lab = obj.labels.indexOf(value[labelField]);
            obj.data[lab] = parseFloat(value.total).toFixed(2); 
        });
      } else {
        // TODO: work without series
        obj.series = series;
      }
      return obj;
    };

    var relabel = function(object, newLabels) {
      object.labels = newLabels;
      return object;
    };

    return {
      gauge1: function success(data,status){  
        var dado = 0;

        // angular.forEach(data, function(value, key){
        //   if (dado != 0) {
        //     dado = parseFloat(dado) - parseFloat(value.total);
        //   } else {
        //     dado = parseFloat(value.total);
        //   }
        // });

        // dado = (dado * 1000).toLocaleString().replace(',','.');


        dado = ((data[1].total - data[0].total) / data[0].total) * 100;

        var formatFunction = function(value, ratio){
          return value.toLocaleString().replace(',','.'); 
        }

        var returnedObject = {label: '%', data: dado.toFixed(2), formatValue: formatFunction}
        $rootScope.gauge1.data = returnedObject;
      },

      gauge2: function success(data,status){  
        var dado = 0;

        dado = ((data[1].total - data[0].total) / data[0].total) * 100;

        var formatFunction = function(value, ratio){
          return value.toLocaleString().replace(',','.'); 
        }

        var returnedObject = {label: '%', data: dado.toFixed(2), formatValue: formatFunction}
        $rootScope.gauge2.data = returnedObject;
      },
      
      chart1: function success(data,status){  
        var ret = {labels: [], data: [[]]};
        var lastDay = new Date($rootScope.ano,($rootScope.mes.value),0).getDate();
        var labels = [];

        data[0].data.sort(function(a,b){
          return a.dia - b.dia;
        });

        for ( var i = 1; i <= lastDay; i++) {
          labels.push(i);
        }

        var returnedObject = fillLineObject(ret, data[0].data, labels, 'dia');
        $rootScope.chart1.data = returnedObject;
      },

      chart2: function success(data,status){
        var ret = {labels: [], data: [[]]};
        var labels = [8,9,10,11,12,1,2,3,4,5,6,7];
        var series = [];

        data[0].data.sort(function(a,b){
          return a.dia-b.dia;
        });

        angular.forEach(data, function(value,key){
          if (series.indexOf(value.periodo) == -1) {
            series.push(value.periodo);
          }
        });

        var returnedObject = fillLineObject(ret, data, labels, 'mes_id', series,'periodo');

        $rootScope.chart2.data = relabel(returnedObject,['Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai','Jun','Jul']);
      },

      chart3: function success(data,status){
        var ret = {labels: [], data: [[]]};
        var labels = [];
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

        labels.sort(function(a,b){return a-b;});

        var returnedObject = fillBarObject(ret, data, labels, 'periodo', series,'tipo');
        $rootScope.chart3.data = returnedObject;
      },

      chart4: function success(data,status){
        var ret = {labels: [], data: [[]]};
        var labels = [];
        var series = [];

        if ($rootScope.estado != ''){
          labels.push($rootScope.estado.trim());
        } else {
          labels = ['AC','AM','AP','MA','MT','PA','RO','RR','TO'];
        }

        angular.forEach(data, function(value,key){
          if (series.indexOf(value.periodo) == -1) {
            series.push(value.periodo);
          }
        });

        labels.sort(function(a,b){return a-b;});

        var returnedObject = fillBarObject(ret, data, labels, 'estado', series,'periodo');
        $rootScope.chart4.data = returnedObject;
      },

      chart5: function success(data,status){
        var ret = {labels: [], data: [[]]};
        var labels = [];
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

        labels.sort(function(a,b){return parseInt(a)-parseInt(b);});
        // labels.sort(function(a,b){return a<b;});

        var returnedObject = fillLineObject(ret, data, labels, 'periodo_prodes', series,'taxa');
        $rootScope.chart5.data = returnedObject;
      },

      chart6: function success(data,status){    
        var ret = {labels: [], data: [[]]};
        var labels = [];
        var series = [];

        if ($rootScope.estado != '') {
          labels.push($rootScope.estado.trim());
        } else {
          labels = ['AC','AM','AP','MA','MT','PA','RO','RR','TO'];
        }

        angular.forEach(data, function(value,key){
          if (series.indexOf(value.taxa) == -1) {
            series.push(value.taxa);
          }
        });

        labels.sort(function(a,b){return a > b;});

        var returnedObject = fillBarObject(ret, data, labels, 'estado', series,'taxa');
        $rootScope.chart6.data = returnedObject;
      },

      chart7: function success(data,status){
        var ret = {labels: [], data: [[]]};
        var labels = [8,9,10,11,12,1,2,3,4,5,6,7];
        var series = [];

        angular.forEach(data, function(value,key){
          if (series.indexOf(value.taxa) == -1) {
            series.push(value.taxa);
          }
        });

        var returnedObject = fillLineObject(ret, data, labels, 'mes', series,'taxa');
        $rootScope.chart7.data = relabel(returnedObject,['Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai','Jun','Jul']);
      },

      chart8: function success(data,status){
        var ret = {labels: [], data: []};
        var states = ['AC','AM','AP','MA','MT','PA','RO','RR','TO'];
        var labels = data[0].data.map(function(d){ return d.estado;});
        var series = [];

        states.map(function(s){if (labels.indexOf(s) == -1) {labels.push(s);}});

        angular.forEach(data, function(value,key){
          if (series.indexOf(value.taxa) == -1) {
            series.push(value.taxa);
          }
        });

        var returnedObject = fillPieObject(ret, data[0].data, labels, 'estado');
        $rootScope.chart8.data = returnedObject;
      },

      chart9: function success(data,status){
        var ret = {labels: [], data: []};
        var labels = data[0].data.map(function(d){ return d.estado;});
        var states = ['AC','AM','AP','MA','MT','PA','RO','RR','TO'];
        var series = [];

        states.map(function(s){if (labels.indexOf(s) == -1){labels.push(s);}});

        angular.forEach(data, function(value,key){
          if (series.indexOf(value.taxa) == -1) {
            series.push(value.taxa);
          }
        });

        var returnedObject = fillPieObject(ret, data[0].data, labels, 'estado');
        $rootScope.chart9.data = returnedObject;
      }
    };
  }]);
