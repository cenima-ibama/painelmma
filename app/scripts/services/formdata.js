'use strict';

/**
 * @ngdoc service
 * @name estatisticasApp.formData
 * @description
 * # formData
 * Service in the estatisticasApp.
 */
angular.module('estatisticasApp')
  .service('formData', function () {

    	var	data,
    		baseUrl = 'images/icons',
    		anos = [],
    		startDate = 2004,
    		thisYear = new Date(),
    		current = thisYear.getFullYear();

    	while( startDate <= current  ){
    		anos.push(startDate);
    		startDate++;
    	}

    	
 		data = {

 			anos: anos,

	    	estados: [
		        { name: 'AC', image: baseUrl + '/AC.png', subtitle: 'AC', selected:""},
		        { name: 'AM', image: baseUrl + '/AM.png', subtitle: 'AM', selected:"" },
		        { name: 'AP', image: baseUrl + '/AP.png', subtitle: 'AP', selected:"" },
		        { name: 'MA', image: baseUrl + '/MA.png', subtitle: 'MA', selected:"" },
		        { name: 'MT', image: baseUrl + '/MT.png', subtitle: 'MT', selected:"" },
		        { name: 'PA', image: baseUrl + '/PA.png', subtitle: 'PA', selected:"" },
		        { name: 'RO', image: baseUrl + '/RO.png', subtitle: 'RO', selected:"" },
		        { name: 'RR', image: baseUrl + '/RR.png', subtitle: 'RR', selected:"" },
		        { name: 'TO', image: baseUrl + '/TO.png', subtitle: 'TO', selected:"" },
		        { name: '', image: baseUrl + '/BR.png', subtitle: 'AML', selected:"active" }
	        ],

	        meses: [
				{name: 'Janeiro', value: '1'},
				{name: 'Fevereiro', value: '2'}, 
				{name: 'Março', value: '3'},
				{name: 'Abril', value: '4'}, 
				{name: 'Maio', value: '5'}, 
				{name: 'Junho', value: '6'}, 
				{name: 'Julho', value: '7'}, 
				{name: 'Agosto', value: '8'}, 
				{name: 'Setembro', value: '9'}, 
				{name: 'Outubro', value: '10'}, 
				{name: 'Novembro', value: '11'}, 
				{name: 'Dezembro', value: '12'}
	        ],

	        tipos: [
				{name: 'DETER MODIS', value: 'DETER'},
				{name: 'DETER AWiFS', value: 'AWIFS'}
	        ],

	        estagios: [
				{name: 'Degradação + Corte Raso', value: 'deter_modis', type:['DETER']},
				{name: 'Degradação', value: 'degradacao', type:['AWIFS','DETER']},
				{name: 'Corte Raso', value: 'corte_raso', type:['AWIFS','DETER']},
				{name: 'Cicatriz de Queimada', value: 'cicatriz_queimada', type:['AWIFS','DETER']},
				{name: 'Mineração', value: 'mineracao', type:['AWIFS']}
	        ]
 			
 		};

 		return data;

 
  });
