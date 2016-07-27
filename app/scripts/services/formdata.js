'use strict';

/**
 * @ngdoc service
 * @name estatisticasApp.formData
 * @description
 * # formData
 * Service in the estatisticasApp.
 */
angular.module('estatisticasApp')
  .service('formData', ['$cookies', function ($cookies) {

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
	        { name: 'AC', image: baseUrl + '/AC.png', subtitle: 'AC', selected:''},
	        { name: 'AM', image: baseUrl + '/AM.png', subtitle: 'AM', selected:'' },
	        { name: 'AP', image: baseUrl + '/AP.png', subtitle: 'AP', selected:'' },
	        { name: 'MA', image: baseUrl + '/MA.png', subtitle: 'MA', selected:'' },
	        { name: 'MT', image: baseUrl + '/MT.png', subtitle: 'MT', selected:'' },
	        { name: 'PA', image: baseUrl + '/PA.png', subtitle: 'PA', selected:'' },
	        { name: 'RO', image: baseUrl + '/RO.png', subtitle: 'RO', selected:'' },
	        { name: 'RR', image: baseUrl + '/RR.png', subtitle: 'RR', selected:'' },
	        { name: 'TO', image: baseUrl + '/TO.png', subtitle: 'TO', selected:'' },
	        { name: '', image: baseUrl + '/BR.png', subtitle: 'AML', selected:'active' }
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
					{name: 'DETER MODIS', value: 'DETER'}
        ],
			  tipos_cruzamento: [
					{name: 'DETER', value: 'Alerta DETER'},
					{name: 'AWIFS', value: 'Alerta AWiFS'},
					// {name: 'PRODES', value: 'PRODES'},
					// {name: 'INDICAR', value: 'INDICAR'},
        ],
        estagios: [
					{name: 'Corte Raso', value: 'corte_raso', type:['Alerta AWiFS','DETER']},
					{name: 'Degradação', value: 'degradacao', type:['Alerta AWiFS','DETER']},
					{name: 'Cicatriz de Queimada', value: 'cicatriz_queimada', type:['Alerta AWiFS','DETER']},
					{name: 'Mineração', value: 'mineracao', type:['Alerta AWiFS']},
					{name: 'Degradação + Corte Raso', value: 'deter_modis', type:['DETER']}
        ],
        estagios_cruzamento: [
					{name: 'Degradação + Corte Raso', value: '', type:['Alerta DETER']},

					{name: 'Degradação', value: 'degradacao', type:['INDICAR']},
					{name: 'Fogo em Floresta', value: 'FF', type:['INDICAR']},

					{name: 'Degradação', value: 'DEGRADACAO', type:['Alerta AWiFS']},
					{name: 'Desmatamento Corte Raso', value: 'DESMATAMENTO_CR', type:['Alerta AWiFS']},
					{name: 'Desmatamento Veg', value: 'DESMATAMENTO_VEG', type:['Alerta AWiFS']},
					{name: 'Cicatriz de Queimada', value: 'CICATRIZ_DE_QUEIMADA', type:['Alerta AWiFS']},
					{name: 'Corte Seletivo Tipo 1', value: 'CS_TIPO1', type:['Alerta AWiFS']},
					{name: 'Corte Seletivo Tipo 2', value: 'CS_TIPO2', type:['Alerta AWiFS']},
					{name: 'Mineração', value: 'MINERACAO', type:['Alerta AWiFS']},
					{name: 'Corte Seletivo Convencional', value: 'CS_CONVENCIONAL', type:['Alerta AWiFS']},
					{name: 'Corte Seletivo Regular', value: 'CS_REGULAR', type:['Alerta AWiFS']},

					{name: 'Corte Raso', value: 'corte_raso', type:['PRODES','INDICAR']},
					{name: 'Todos', value: '', type:['INDICAR', 'Alerta AWiFS']},

        ],
        areas_comparacao: [
        	{name: 'Terras Indígenas', value: 'dominio_ti'},
        	{name: 'UC de Uso Sustentável', value: 'dominio_us'},
        	{name: 'UC de Proteção Integral', value: 'dominio_pi'},
        	{name: 'Assentamentos', value: 'dominio_as'},
        	{name: 'Áreas Livres', value: 'areas_livres'}
        ],
        dominios: [
        	{name: 'Federal', value: 'Federal', type:['dominio_ti','dominio_us','dominio_pi','dominio_as','areas_livres']},
        	{name: 'Estadual', value: 'Estadual', type:['dominio_us','dominio_pi','dominio_as','areas_livres']}
        ]
 			
 		};

 		if ($cookies.get('user_data')) {
 			data.tipos.push({name: 'DETER AWiFS', value: 'AWIFS'});
 		}

 		return data;

 
  }]);
