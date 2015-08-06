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
		        { name: 'AC', image: baseUrl + '/AC.png', subtitle: 'AC' },
		        { name: 'AM', image: baseUrl + '/AM.png', subtitle: 'AM' },
		        { name: 'AP', image: baseUrl + '/AP.png', subtitle: 'AP' },
		        { name: 'MA', image: baseUrl + '/MA.png', subtitle: 'MA' },
		        { name: 'MT', image: baseUrl + '/MT.png', subtitle: 'MT' },
		        { name: 'PA', image: baseUrl + '/PA.png', subtitle: 'PA' },
		        { name: 'RO', image: baseUrl + '/RO.png', subtitle: 'RO' },
		        { name: 'RR', image: baseUrl + '/RR.png', subtitle: 'RR' },
		        { name: 'TO', image: baseUrl + '/TO.png', subtitle: 'TO' },
		        { name: 'BR', image: baseUrl + '/BR.png', subtitle: 'Amazônia Legal' }
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
	        ]
 			
 		};

 		return data;

 
  });
