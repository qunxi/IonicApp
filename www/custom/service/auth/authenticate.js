(function(){
	'use strict';

	angular
		.module('custom-service')
	    .factory('authenticate', authenticate);

	authenticate.$inject = ['$http', 'authToken'];

	function authenticate($http, authToken){

		var service = {
			login: login,
			register: register,
			logout: logout
		};

		return service;

		var api_url = ""; //according concret project to setup

		function login(username, password){
			return $http.post(api_url, {email: username, password: password})
				 		.success(function(res){
				 			authToken.setToken(res);
				 		});
		}

		function logout(){
			authToken.removeToken();
		}

		function register(user){

		}
	}

})();