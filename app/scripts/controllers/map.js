'use strict';

/**
 * @ngdoc function
 * @name estatisticasApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the estatisticasApp
 */
angular.module('estatisticasApp')
  .controller('MapCtrl', function ($scope, $rootScope, RestApi, $timeout, $q) {
    $rootScope.mapView = true;
    $rootScope.statView = false;
    $rootScope.crossView = false;
		$scope.mapObject = {loading: true};

    $timeout(function(){
			$scope.mapObject.map = L.map('mapa').setView([-7.0531, -55.2241], 10);

			L.Icon.Default.imagePath = 'images';

			// console.log($rootScope.filters);

			// $scope.mapObject.map.on('moveend', function(){
			// 	console.log(JSON.stringify($scope.mapObject.map.getCenter()));
			// })
			// $scope.mapObject.map.on('zoomend', function(){
			// 	console.log(JSON.stringify($scope.mapObject.map.getZoom()));
			// })


			// BASE LAYERS - DECLARING

			var bingKey = "AsyRHq25Hv8jQbrAIVSeZEifWbP6s1nq1RQfDeUf0ycdHogebEL7W2dxgFmPJc9h";

		  var binghybrid = new L.BingLayer(bingKey, {
		    type: "AerialWithLabels",
		    attribution: ""
		  }).addTo($scope.mapObject.map);

			var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			});

			var thunderforest = L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
			  maxZoom: 18
			});
		  // var bingaerial = new L.BingLayer(bingKey, {
		  //   type: "Aerial",
		  //   attribution: ""
		  // });

		  // var bingroad = new L.BingLayer(bingKey, {
		  //   type: "Road",
		  //   attribution: ""
		  // });


		  // var bingMini = new L.BingLayer(bingKey, {
		  //   type: "AerialWithLabels",
		  //   attribution: "",
		  //   minZoom: 1,
		  //   maxZoom: 11
		  // });


			// SUPPORT LAYERS - DECLARING

			var pontes = L.tileLayer.wms('http://siscom.ibama.gov.br/geoserver/csr/wms', {
		    layers: "csr:tra_ponto_rodoviario_p",
		    format: "image/png",
		    transparent: true
			});

			var uc_protecao = L.tileLayer.wms('http://siscom.ibama.gov.br/geoserver/csr/wms', {
		    layers: "csr:lim_unidade_protecao_integral_a",
		    format: "image/png",
		    transparent: true
			});

			var uc_sustentavel = L.tileLayer.wms('http://siscom.ibama.gov.br/geoserver/csr/wms', {
		    layers: "csr:lim_unidade_uso_sustentavel_a",
		    format: "image/png",
		    transparent: true
			});

			var terras_indigenas = L.tileLayer.wms('http://siscom.ibama.gov.br/geoserver/csr/wms', {
		    layers: "csr:lim_terra_indigena_a",
		    format: "image/png",
		    transparent: true
			});

			// var terras_indigenas = L.tileLayer.wms('http://siscom.ibama.gov.br/geoserver/csr/wms', {
		 //    layers: "csr:lim_terra_indigena_a",
		 //    format: "image/png",
		 //    transparent: true
			// });

			var auto_infracao = L.tileLayer.wms('http://siscom.ibama.gov.br/geoserver/csr/wms', {
		    layers: "csr:adm_auto_infracao_p",
		    format: "image/png",
		    transparent: true
			});

			var grade_rapideye = L.tileLayer.wms('http://siscom.ibama.gov.br/geoserver/csr/wms', {
		    layers: "csr:img_grade_landsat_etm_a",
		    format: "image/png",
		    transparent: true
			});

			var camada_poligonos_base = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:alerta_hexgis_temp",
		    format: "image/png",
		    transparent: true
			});


			// CLOUD LAYERS - DECLARING

			var aqua_2016341 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:AERONET_Alta_Floresta.2016341.aqua.250m",
		    format: "image/png",
		    transparent: true
			});

			var aqua_2016349 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "p	pocmma:AERONET_Alta_Floresta.2016349.aqua.250m",
		    format: "image/png",
		    transparent: true
			});

			var aqua_2016357 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:AERONET_Alta_Floresta.2016357.aqua.250m",
		    format: "image/png",
		    transparent: true
			});

			var aqua_2016365 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:AERONET_Alta_Floresta.2016365.aqua.250m",
		    format: "image/png",
		    transparent: true
			});

			var aqua_2017007 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:AERONET_Alta_Floresta.2017007.aqua.250m",
		    format: "image/png",
		    transparent: true
			});

			var aqua_2017015 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:AERONET_Alta_Floresta.2017015.aqua.250m",
		    format: "image/png",
		    transparent: true
			});

			var aqua_2017023 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:AERONET_Alta_Floresta.2017023.aqua.250m",
		    format: "image/png",
		    transparent: true
			});

			var aqua_2017031 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:AERONET_Alta_Floresta.2017031.aqua.250m",
		    format: "image/png",
		    transparent: true
			});

			var aqua_2017039 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:AERONET_Alta_Floresta.2017039.aqua.250m",
		    format: "image/png",
		    transparent: true
			});


			// LANDSAT 8 LAYERS - DECLARING

			var LC8_2016341 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:LC82270652016341LGN00_r6g5b4",
		    format: "image/png",
		    transparent: true
			});

			var LC8_2016357 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:LC82270652016357LGN00_r6g5b4",
		    format: "image/png",
		    transparent: true
			});

			var LC8_2017007 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:LC82270652017007LGN00_r6g5b4",
		    format: "image/png",
		    transparent: true
			});

			var LC8_2017023 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:LC82270652017023LGN00_r6g5b4",
		    format: "image/png",
		    transparent: true
			});


			// LANDSAT 7 LAYERS - DECLARING

			var LE7_2016349 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:LE72270652016349CUB00_r5g4b3",
		    format: "image/png",
		    transparent: true
			});

			var LE7_2016365 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:LE72270652016365CUB00_r5g4b3",
		    format: "image/png",
		    transparent: true
			});

			var LE7_2017015 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:LE72270652017015CUB00_r5g4b3",
		    format: "image/png",
		    transparent: true
			});

			var LE7_2017031 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:LE72270652017031CUB00_r5g4b3",
		    format: "image/png",
		    transparent: true
			});


			// INPE LAYERS - DECLARING

			var camada_inpe = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:alertas_inpe_227065_dez_jan",
		    format: "image/png",
		    transparent: true
			});

			var camada_inpe2 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:alertas_inpe_227065",
		    format: "image/png",
		    transparent: true
			});

			var camada_prodes2 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:prodes_digital_227065_1",
		    format: "image/png",
		    transparent: true
			});


			// SENTINEL LAYERS - DECLARING

			var S2_20161228 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:S2_21MYN_20161228_2348-11_atp_8bit",
		    format: "image/png",
		    transparent: true
			});

			var S2_20170107 = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:S2_21MXN_20170107_2348-11_8bit",
		    format: "image/png",
		    transparent: true
			});


			// POLYGON LAYERS - DECLARING

			var camada_poligonos = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:alerta_hexgis",
		    format: "image/png",
		    transparent: true
			}).addTo($scope.mapObject.map);;

			var camada_poligonos_agrupados = L.tileLayer.wms('http://10.1.8.116:8080/geoserver/pocmma/wms', {
		    layers: "pocmma:alerta_hexgis_simp",
		    format: "image/png",
		    transparent: true
			}).addTo($scope.mapObject.map);


			$scope.mapObject.control = new L.control.switch(
			{
			  // "Bing Aerial": {
			  // 	layer: bingaerial
			  // },
			  // "Bing Road": {
			  // 	layer: bingroad
			  // },
			  // "Bing Mini": {
			  // 	layer: bingMini
			  // },
			  "Bing Hybrid": {
			  	layer: binghybrid
			  },
			  "Thunder Forest": {
			  	layer: thunderforest
			  },
			  "OpenStreetMap": {
					layer: osm
			  },
			  "Poligonais": {
					layer: camada_poligonos_base
			  }
			},{},{
	      systemLayers: {
	        icon: '<span class="glyphicon glyphicon-map-marker"></span>',
	        selected: true
	      },
	      polygons: {
	        icon: '<span class="glyphicon glyphicon-eye-open"></span>',
	      },
	      scenes: {
	        icon: '<span class="glyphicon glyphicon-globe"></span>',
	      },
	      cloudLayers: {
	        icon: '<span class="glyphicon glyphicon-cloud"></span>',
	      },
			},{
			  removable: false,
			  defaultLayer: false,
			}).addTo($scope.mapObject.map);

			// SUPPORT LAYERS - ADDING
			$scope.mapObject.control.addOverLayer(pontes, 'Pontes e Tuneis', true, 'systemLayers');
			$scope.mapObject.control.addOverLayer(uc_protecao, 'UC Proteção Integral', true, 'systemLayers');
			$scope.mapObject.control.addOverLayer(uc_sustentavel, 'UC Uso Sustentavel', true, 'systemLayers');
			$scope.mapObject.control.addOverLayer(terras_indigenas, 'Terras Indígenas', true, 'systemLayers');
			$scope.mapObject.control.addOverLayer(auto_infracao, 'Auto Infração', true, 'systemLayers');
			$scope.mapObject.control.addOverLayer(grade_rapideye, 'Grade Rapideye', true, 'systemLayers');


			//  SCENE LAYERS - ADDING
			$scope.mapObject.control.addOverLayer(LC8_2016341, 'LANDSAT 8 06/12/16', true, 'scenes');
			$scope.mapObject.control.addOverLayer(LE7_2016349, 'LANDSAT 7 14/12/16', true, 'scenes');
			$scope.mapObject.control.addOverLayer(LC8_2016357, 'LANDSAT 8 22/12/16', true, 'scenes');
			$scope.mapObject.control.addOverLayer(S2_20161228, 'SENTINEL 2 28/12/16', true, 'scenes');
			$scope.mapObject.control.addOverLayer(LE7_2016365, 'LANDSAT 7 30/12/16', true, 'scenes');
			$scope.mapObject.control.addOverLayer(LC8_2017007, 'LANDSAT 8 07/01/17', true, 'scenes');
			$scope.mapObject.control.addOverLayer(S2_20170107, 'SENTINEL 2 07/01/17', true, 'scenes');
			$scope.mapObject.control.addOverLayer(LE7_2017015, 'LANDSAT 7 15/01/17', true, 'scenes');
			$scope.mapObject.control.addOverLayer(LC8_2017023, 'LANDSAT 8 23/01/17', true, 'scenes');		
			$scope.mapObject.control.addOverLayer(LE7_2017031, 'LANDSAT 7 31/01/17', true, 'scenes');



			// CLOUD LAYERS - ADDING
			$scope.mapObject.control.addOverLayer(aqua_2016341, 'MODIS AQUA 06/12/16', true, 'cloudLayers');
			$scope.mapObject.control.addOverLayer(aqua_2016349, 'MODIS AQUA 14/12/16', true, 'cloudLayers');
			$scope.mapObject.control.addOverLayer(aqua_2016357, 'MODIS AQUA 22/12/16', true, 'cloudLayers');
			$scope.mapObject.control.addOverLayer(aqua_2016365, 'MODIS AQUA 30/12/16', true, 'cloudLayers');
			$scope.mapObject.control.addOverLayer(aqua_2017007, 'MODIS AQUA 07/01/17', true, 'cloudLayers');
			$scope.mapObject.control.addOverLayer(aqua_2017015, 'MODIS AQUA 15/01/17', true, 'cloudLayers');
			$scope.mapObject.control.addOverLayer(aqua_2017023, 'MODIS AQUA 23/01/17', true, 'cloudLayers');
			$scope.mapObject.control.addOverLayer(aqua_2017039, 'MODIS AQUA 08/02/17', true, 'cloudLayers');


			// POLYGON LAYERS - ADDING
			$scope.mapObject.control.addOverLayer(camada_inpe2, 'INPE Máscara', true, 'polygons');
			$scope.mapObject.control.addOverLayer(camada_prodes2, 'PRODES Máscara', true, 'polygons');
			$scope.mapObject.control.addOverLayer(camada_inpe, 'INPE Dez/16 Jan/17', true, 'polygons');
			$scope.mapObject.control.addOverLayer(camada_poligonos_agrupados, 'Poligonos Hex (Agrupados)', true, 'polygons');
			$scope.mapObject.control.addOverLayer(camada_poligonos, 'Poligonos Hex (Todos)', true, 'polygons');



			if ($rootScope.filters) {
				var options = jQuery.extend({}, $rootScope.filters);;

				options.tipo = (options.estagio != '') && (options.tipo == 'DETER') ? 'DETER_QUALIF' : options.tipo;

				options.type = 'mapa';

				var deterPromise = RestApi.getObject(options, function success(data,status){
					// console.log(data);
					// var json = data.toJSON();


		    	// var markers = L.markerClusterGroup();

		   //  	var markers = new L.MarkerClusterGroup();

					var jsondeter = L.geoJson(data.toJSON(), {
	    			onEachFeature: function(feature, layer) {
	    				var tipo = $rootScope.filters.tipo == 'DETER_QUALIF' ? 'DETER Qualificado' : ($rootScope.filters.tipo == 'DETER' ? 'DETER' : 'AWIFS');

    					layer.bindPopup( '<h4> Dados ' + tipo + ' </h4>'+
    													'<h5><b>Data imagem:</b> ' + feature.properties.data_imagem + ' </h5>' +
    													'<h5><b>Área:</b> ' + feature.properties.area_km2 + ' km²</h5>');

    					// var coord = angular.forEach(feature.geometry.coordinates[0], function(value, key){
    					// 	var sup = value[1];
    					// 	value[1] = value[0];
    					// 	value[0] = sup;
    					// });

    					// var pol = new L.Polygon(coord).getBounds().getCenter();
    					// markers.addLayer(new L.Marker(pol));
	    			}
	    		});

	    		$scope.mapObject.control.addOverLayer(jsondeter, 'DETER Filtrado', true, 'polygons');
	    		// $scope.mapObject.control.addOverLayer(markers, 'Clusters', true);

					// if (data.toJSON().features.length) {
		   //  		$scope.mapObject.map.fitBounds(json.getBounds());
		   //  	}

		    	$scope.mapObject.map.addLayer(jsondeter);

		    	// $scope.mapObject.map.addLayer(markers);

				}).$promise;

				var options = jQuery.extend({}, $rootScope.filters);
				options.type = 'get-map-data';

	   		var polygonsPromise = RestApi.get_mmaObject(options, function success(data, status){

					var jsonpol = L.geoJson(data.toJSON(), {
						style: function(){
							return {color: '#FFFF00', fillColor: '#FFFF00', fillOpacity: 0, strokeWidth: 2};
						},
	    			onEachFeature: function(feature, layer) {
	    				// var tipo = $rootScope.filters.tipo == 'DETER_QUALIF' ? 'DETER Qualificado' : ($rootScope.filters.tipo == 'DETER' ? 'DETER' : 'AWIFS');

	    				var jul = parseInt(feature.properties.img_n_ex.substr(13,3))
	    				var ano = parseInt(feature.properties.img_n_ex.substr(9,4))
	    				var dia, mes;


	    				if (ano == 2016) {
	    					dia = ("0" + (31 - (366 - jul))).slice(-2);
	    					mes = "12"
	    				} else if (jul <= 31){
	    					dia = ("0" + jul).slice(-2);
	    					mes = ("0" + 1).slice(-2);
	    				} else {
	    					dia = ("0" + (jul - 31)).slice(-2);
	    					mes = ("0" + 2).slice(-2);
	    				}

	    				var cortenao = feature.properties.img_n_ex.substr(0,3) + ' ' + ano + '-' + mes + '-' + dia


	    				jul = parseInt(feature.properties.img_ex.substr(13,3))
	    				ano = parseInt(feature.properties.img_ex.substr(9,4))

	    				if (ano == 2016) {
	    					dia = ("0" + (31 - (366 - jul))).slice(-2);
	    					mes = "12"
	    				} else if (jul <= 31){
	    					dia = ("0" + jul).slice(-2);
	    					mes = ("0" + 1).slice(-2);
	    				} else {
	    					dia = ("0" + (jul - 31)).slice(-2);
	    					mes = ("0" + 2).slice(-2);
	    				}

	    				var corte = feature.properties.img_ex.substr(0,3) + ' ' + ano + '-' + mes + '-' + dia

    					layer.bindPopup( '<h4><b> ' + feature.properties.id_des + ' </b></h4>'+
    													'<h5><b>' + feature.properties.estagio + '</b> de <b>' + feature.properties.area_ha + ' </b> ha</h5>' +
    													'<h5> Corte não existe: <b>' + cortenao + '</b></h5>' +
    													'<h5> Corte existe: <b>' + corte + ' </b></h5>' +
    													'<h5> Intervalo :<b> ' + feature.properties.interval + ' </b> dias </h5>');
	    			}
					});

	    		$scope.mapObject.control.addOverLayer(jsonpol, 'Poligonos Hex (Filtrados)', true, 'polygons');

		    	$scope.mapObject.map.addLayer(jsonpol);
	   		}).$promise;
				
				$q.all([deterPromise, polygonsPromise]).then(function(data){
					$scope.mapObject.loading = false;
				})

			} else {
				$scope.mapObject.loading = false;
			}

			// new MultilayerFeatureGetter($scope.mapObject.map);

    },0);
	});
