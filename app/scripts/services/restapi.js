'use strict';

/**
 * @ngdoc service
 * @name estatisticasApp.RestApi
 * @description
 * # RestApi
 * Factory in the estatisticasApp.
 */


angular.module('estatisticasApp')
  .factory('RestApi', function ($resource) {
    return $resource( 'http://10.1.8.28:89/painelmma_api/api/:type/', {type: '@type'},
    // return $resource( 'http://localhost:8000/api/:type/', {type: '@type'},
    // return $resource( 'http://siscom.ibama.gov.br/painelmma_api/api/:type/', {type: '@type'},
      {
        get: {
          method:'GET',
          params:{ format:'json' },
          isArray: true
        },
        post: {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          isArray: true,
        },
        getObject: {
          // url: 'http://10.1.8.210:8000/api/diario/:uf/:ano/:mes/:tipo/',
          method:  'GET',
          params:{ format:'json' },
          isArray: false
        },
        obtain_pass : {
          // url : 'http://localhost:8000/login/obtain-pass/',
          // url : 'http://siscom.ibama.gov.br/painel_api/login/obtain-pass/',
          url : 'http://10.1.8.28:89/painelmma_api/login/obtain-pass/',
          method : 'POST',
          params : {
            format : 'json'
          },
          isArray : false
        },
        get_painelmma : {
          // url : 'http://localhost:8000/painelmma_api/:type/',
          url : 'http://10.1.8.28:89/painelmma_api/painelmma_api/:type/',
          method : 'GET',
          params : {
            format : 'json'
          },
          isArray : true
        }  ,
        get_mmaObject : {
          // url : 'http://localhost:8000/painelmma_api/:type/',
          url : 'http://10.1.8.28:89/painelmma_api/painelmma_api/:type/',
          method : 'GET',
          params : {
            format : 'json'
          },
          isArray : false
        }   
      },
      {stripTrailingSlashes: false}
    );
  });
