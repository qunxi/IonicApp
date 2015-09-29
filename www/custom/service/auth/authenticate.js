(function(){
	'use strict';

	angular
		.module('custom-service')
	    .factory('authenticate', authenticate);

	authenticate.$inject = ['$http', 'authToken', '$state'];

	function authenticate($http, authToken, $state){

		var API_URL = "http://localhost:3000/"; //according concret project to setup

		var service = {
			login: login,
			register: register,
			logout: logout
		};

		return service;

		
		function login(username, password){
			return $http.post(API_URL + 'login', {email: username, password: password})
				 		.then(function success(res){
				 			authSuccessful(res);
				 		 }, 
				 		 function error(res){

				 		});
		}

		function logout(){
			authToken.removeToken();
		}

		function register(username, password, email){
			authToken.removeToken();
			$http.post(API_URL + 'register', { 
						  username: username,
						  password: password, 
						  email: email })
				 .then( function success(res){
				 		authSuccessful(res);
				 		}, 
					   function error(res){
				 			console.log(res.message);
				 });
		}

		function authSuccessful(res){
			authToken.setToken(res.token);
			$state.go('app.home');
		}
	}

})();