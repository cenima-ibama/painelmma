'use strict';

/**
 * @ngdoc directive
 * @name estatisticasApp.directive:login
 * @description
 * # login
 */
angular.module('estatisticasApp')
  .directive('login', ['RestApi','$cookies', '$window', '$http', function (RestApi, $cookies, $window, $http) {
    return {
      templateUrl: 'views/partials/login.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

    		scope.logged = $cookies.get('user_data') ? true : false;


        if ($cookies.get('user_data')){
          $http.defaults.headers.get = [];
          $http.defaults.headers.get['Authorization'] = 'Token ' + angular.fromJson($cookies.get('user_data')).token;
        }


    		function showMessage (argument) {
    			scope.errorLogin = argument;
    		};

    		scope.login = function(user, pass) {
    			var response = RestApi.obtain_pass({username: user, password:pass }).$promise;

    			response.then(loginSuccess, loginFail);


		      function loginSuccess(user_data) {
	          $cookies.put('user_data', angular.toJson(user_data));
      			$window.location.reload();
		      }

		      function loginFail(error) {
	          showMessage('Falha na requisição. Consulte o administrador do sistema', 'danger');
		      }
	    		// console.log(scope.access.login);
	    		// console.log(scope.access.password);
    		};
      }
    };
  }]);
