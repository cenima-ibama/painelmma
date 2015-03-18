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
    'chart.js'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MapCtrl'
      })
      .when('/consultar', {
        templateUrl: 'views/charts.html',
        controller: 'ChartsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });