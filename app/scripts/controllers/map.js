'use strict';

/**
 * @ngdoc function
 * @name estatisticasApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the estatisticasApp
 */
angular.module('estatisticasApp')
  .controller('MapCtrl', function ($scope, $rootScope, RestApi, $timeout) {
    $rootScope.mapView = true;
		$scope.mapObject = {loading: true};

    $timeout(function(){
			$scope.mapObject.map = L.map('mapa').setView([-12, -52], 5);

			L.Icon.Default.imagePath = 'images';

			console.log($rootScope.filters);

			var thunderforest = L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
			  maxZoom: 18
			});

			var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo($scope.mapObject.map);

			var pontes = L.tileLayer.wms('http://siscom.ibama.gov.br/geoserver/csr/wms', {
		    layers: "csr:tra_ponto_rodoviario_p",
		    format: "image/png",
		    transparent: true
			});

			$scope.mapObject.control = new L.control.switch(
			{
			  "OpenStreetMap": {
				layer: osm
			  },
			  "Thunder Forest": {
			  layer: thunderforest
			  }
			},{
				"Pontes e Tuneis": {
						layer: pontes
					}
			},{},{
			  removable: false,
			}).addTo($scope.mapObject.map);

			if ($rootScope.filters) {
				var options = jQuery.extend({}, $rootScope.filters);;

				options.tipo = (options.estagio != 'Degradação + Corte Raso' && options.tipo == 'DETER') ? 'DETER_QUALIF' : options.tipo;

				options.type = 'mapa';

				RestApi.getObject(options, function success(data,status){
					// console.log(data);
					// var json = data.toJSON();


					var json = L.geoJson(data.toJSON(), {
	    			onEachFeature: function(feature, layer) {
	    				var tipo = $rootScope.filters.tipo == 'DETER_QUALIF' ? 'DETER Qualificado' : ($rootScope.filters.tipo == 'DETER' ? 'DETER' : 'AWIFS');

    					layer.bindPopup( '<h4> Dados ' + tipo + ' </h4>'+
    													'<h5><b>Data imagem:</b> ' + feature.properties.data_imagem + ' </h5>' +
    													'<h5><b>Área:</b> ' + feature.properties.area_km2 + ' km²</h5>');
	    			}
	    		});

	    		$scope.mapObject.control.addOverLayer(json, 'DETER Filtrado', true);

					if (data.toJSON().features.length) {
		    		$scope.mapObject.map.fitBounds(json.getBounds());
		    	}

		    	$scope.mapObject.map.addLayer(json);

					$scope.mapObject.loading = false;
				});
			} else {
				$scope.mapObject.loading = false;
			}
    },0);
	});
