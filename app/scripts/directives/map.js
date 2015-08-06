'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:map
 * @description
 * # map
 */
angular.module('estatisticasApp')
  .directive('map', function () {
    return {
      template: '<div resizable ng-style="{ height: windowHeight -60 }" id="mapa"></div>',
      restrict: 'E',
      controller: function($scope){

		$scope.map = L.map('mapa').setView([-12, -52], 5);

		L.Icon.Default.imagePath = 'images';

		var thunderforest = L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
		  maxZoom: 18
		});

		var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo($scope.map);

		var baseMaps = {
		  "Thunder Forest": thunderforest,
		  "OpenStreetMap": osm,
		};

		L.control.layers(baseMaps).addTo($scope.map);

      }
    };
  });
