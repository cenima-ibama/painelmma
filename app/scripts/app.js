'use strict';

/**
 * @ngdoc overview
 * @name estatisticasApp
 * @description
 * # estatisticasApp
 *
 * Main module of the application.
 */
 angular
  .module('estatisticasApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'chart.js',
    'ngCsv'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mapa', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })
      // .when('/consultar', {
      //   templateUrl: 'views/charts.html',
      //   controller: 'ChartsCtrl'
      // })
      .when('/', {
        templateUrl: 'views/charts.html',
        controller: 'ChartsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });