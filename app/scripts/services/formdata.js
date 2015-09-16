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
		        { name: 'BR', image: baseUrl + '/BR.png', subtitle: 'Amazônia Legal', selected:"active" }
	        ],

	        meses: [
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
	        ],

	        tipos: [
				{name: 'DETER', value: 'deter'}
	        ]
 			
 		};

 		return data;

 
  });
