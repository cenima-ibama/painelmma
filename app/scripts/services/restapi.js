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
    return $resource('http://localhost/modulePainel/:type/', {},
      {
        get: {
          method:'GET',
          params:{ format:'json' },
          isArray: false,
        },
        post: {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          isArray: true,
          params:{extra_url: ''}
        },
      },
      {stripTrailingSlashes: false}
    );
  });
