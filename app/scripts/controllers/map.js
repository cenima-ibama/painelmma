'use strict';

/**
 * @ngdoc function
 * @name estatisticasApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the estatisticasApp
 */
angular.module('estatisticasApp')
  .controller('MapCtrl', function ($scope, $rootScope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    L.Icon.Default.imagePath = 'images';

    $rootScope.SystemName = 'Painel de desmatamento';

    $scope.map = L.map('map').setView([-12, -52], 5);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo($scope.map);
	


  });
