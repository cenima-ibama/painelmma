'use strict';

/**
 * @ngdoc function
 * @name estatisticasApp.controller:CruzamentosCtrl
 * @description
 * # CruzamentosCtrl
 * Controller of the estatisticasApp
 */
angular.module('estatisticasApp')
  .controller('CruzamentosCtrl', function ($scope, $rootScope, formData, $timeout, RestApi, restFunctions) {
    // this.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];

    $rootScope.mapView = false;
    $rootScope.statView = false;
    $rootScope.crossView = true;
    $scope.showCharts = false;

    $scope.estados = formData.estados;
    $scope.tipos = formData.tipos_cruzamento;
    $scope.estagios = formData.estagios_cruzamento;
    $scope.areas_comparacao = formData.areas_comparacao;
    $scope.dominios = formData.dominios;

    $scope.estado = $scope.estados[0];
    $scope.tipo = $scope.tipos[0];
    $scope.estagio = $scope.estagios[0];
    $scope.area = $scope.areas_comparacao[0];
    $scope.dominio = $scope.dominios[0];
    $scope.estado = '';

    $rootScope.cruzChart1 = {};
    $rootScope.cruzChart2 = {};
    $rootScope.cruzChart3 = {};
    $rootScope.cruzChart4 = {};

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

    $scope.changeStage = function(tipo){
        $scope.estagio = $scope.estagios.find(function(data){return data.type.indexOf(tipo) >= 0});
    }

    $scope.expandPie = function(ele,html){

        var lab = [];
        var dat = [];

        var obj;

        if (ele.length != 0 && (ele[0].label == 'Estadual' || ele[0].label == 'Federal')){
            if (ele[0].label == 'Estadual') {
                obj = $rootScope.cruzChart2.restReturn[0].estadual;
            } else if (ele[0].label == 'Federal') {
                obj = $rootScope.cruzChart2.restReturn[0].federal;
            }

            angular.forEach(obj, function(value,key){
                lab.push(key + " (" + ele[0].label + ")");
                dat.push(value);
            });
        } else {
            var data = $rootScope.cruzChart2.restReturn;

            dat = [0,0];

            angular.forEach(data[0].estadual, function(value, key){
              dat[0] = dat[0] + value;
            });

            angular.forEach(data[0].federal, function(value, key){
              dat[1] = dat[1] + value;
            });               

            lab = ['Estadual','Federal'];
        }
        
        $scope.cruzChart2.data = {labels:lab, data:dat};
    }

    $scope.queryChart2 = function(options, tipo, ano_inicio, ano_fim, estagio, estado){
        if (options){
            if (options.tipo != tipo){
                return true;
            }
            if (options.ano_inicio != ano_inicio){
                return true;
            }
            if (options.ano_fim != ano_fim){
                return true;
            }
            if (options.estagio != estagio){
                return true;
            }
            if (options.estado != estado){
                return true;
            }

            return false;
        } else {
            return true;
        }
    }


    // $rootScope.cruzChart1.data = {'labels':['1','2','3','4','5','6','7','8','9','12','13','14','15','16','17','18','19'], data: [['193.12','18471.31','18.12','101.12','1.1','9782.21','8190.123','192.12','10192.13','18471.31','18.12','101.12','1.1','9782.21','8190.123','192.12','10192.13']]};
    // $scope.chart1.label = ['a','b','c','d','e','f','g','h','i'];
    // $scope.chart2.data = ['193.12','18471.31','18.12','101.12','1.1','91782.21','8190.123','192.12','10192.13'];
    // $scope.chart2.label = ['a','b','c','d','e','f','g','h','i'];
    // $rootScope.cruzChart2.data = {labels:['1','2','3','4','5','6','7','8','9'], data: [['10192.13','18471.31','101.12','193.12','9782.21','18.12','192.12','1.1','8190.123']]};
    // $scope.chart3.data = ['193.12','18471.31','18.12','101.12','1.1','91782.21','8190.123','192.12','10192.13'];
    // $scope.chart3.label = ['a','b','c','d','e','f','g','h','i'];
    // $rootScope.cruzChart3.data = {labels:['1','2','3','4','5','6','7','8','9'], data: [['193.12','8190.123','18.12','1.1','10192.13','192.12','9782.21','101.12','18471.31']]};
    // $scope.chart4.data = ['1','2','3','4','5','6','7','8','9'];
    // $scope.chart4.data = ['1','2','3','4','5','6','7','8','9'];
    // $rootScope.cruzChart4.data = {labels:['1','2','3','4','5','6','7','8','9'], data: [['18.12','18471.31','8190.123','192.12','193.12','9782.21','101.12','1.1','10192.13']]};

    $scope.filter = function(tipo, anoInicio, anoFim, estagio, area, dominio, estado){
    	$scope.showCharts = true;

    	$rootScope.cruzChart1.title = tipo.name + ' - Gráfico de Linha';
    	$rootScope.cruzChart2.title = tipo.name + ' - Áreas Estaduais vs. Áreas Federais';
    	// $rootScope.cruzChart3.title = tipo.name + ' - Federais - ' + anoInicio + ' a ' + anoFim;
    	// $rootScope.cruzChart4.title = tipo.name + ' - Estaduais - ' + anoInicio + ' a ' + anoFim;


    	$timeout(function(){
            var ano_fim = anoFim.length > 0 ? anoFim.split('/')[2] + '-' + anoFim.split('/')[1] + '-' + anoFim.split('/')[0] : "";
            var ano_inicio = anoInicio.length > 0 ? anoInicio.split('/')[2] + '-' + anoInicio.split('/')[1] + '-' + anoInicio.split('/')[0] : "";


            $rootScope.cruzChart1.options = {type: 'cruz-grafico1', tipo: tipo.value, ano_inicio: ano_inicio, ano_fim: ano_fim, estagio: estagio.value, area: area.value, dominio: dominio.value, estado: estado};
            $rootScope.cruzChart1.returnFunction = restFunctions.cruzChart1;
            $rootScope.cruzChart1.error = null;
            var restChart1 = RestApi.query($scope.cruzChart1.options, $scope.cruzChart1.returnFunction).$promise;


            if ($scope.queryChart2($rootScope.cruzChart2.options, tipo.value, ano_inicio, ano_fim, estagio.value, estado)){
                $rootScope.cruzChart2.options = {type: 'cruz-grafico2', tipo: tipo.value, ano_inicio: ano_inicio, ano_fim: ano_fim, estagio: estagio.value, area: area.value, dominio: dominio.value, estado: estado};
                $rootScope.cruzChart2.returnFunction = restFunctions.cruzChart2;
                $rootScope.cruzChart2.clickFunc = $scope.expandPie;
                $rootScope.cruzChart2.error = null;
                var restChart2 = RestApi.query($scope.cruzChart2.options, $scope.cruzChart2.returnFunction, restFunctions.errorFunc).$promise;
            }


	    	$scope.cruzChart1.loading = false;
	    	$scope.cruzChart2.loading = false;
	    	// $scope.cruzChart3.loading = false;
	    	// $scope.cruzChart4.loading = false;	    	
    	},0);
    }

  });
