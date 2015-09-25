(function(){
	'use strict';

	angular.module('custom-service')
		   .service('authToken', [authToken]);

	function authToken(){

		var storage = $window.localStorage;
		var cacheToken;
		var userToken = "userToken";

		var service = {
			setToken: setToken,
			getToken: getToken,
			isAuthenticate: isAuthenticate
		};

		return service;

		function setToken(token){
			cacheToken = token;
			storage.setItem(userToken, token);
		}

		function getToken(){
			if(!cacheToken)
				cacheToken = storage.getItem(userToken);
			return cacheToken;
		}

		function isAuthenticate(){
			return !!getToken();
		}

		function removeToken(){
			cacheToken = null;
			storage.removeItem(userToken);
		}
	}


})()