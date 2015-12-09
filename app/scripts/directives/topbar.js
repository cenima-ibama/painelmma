'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:topbar
 * @description
 * # topbar
 */
angular.module('estatisticasApp')
  .directive('topbar', ['$cookies','$window', function ($cookies, $window) {
    return {
			templateUrl: 'views/partials/topbar.html',
			link: function postLink(scope, element, attrs) {
				try{
					scope.user_data = angular.fromJson($cookies.get('user_data'));
				} catch	(error){
				}

				scope.logout = function() {
      		$cookies.put('user_data', '');
          // $cookies.remove('user_data');
    			$window.location.reload();
				}
			}
		};
  }]);
