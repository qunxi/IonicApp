(function(){
	'use strict';

	angular.module('custom-service')
		   .factory('authToken', authToken);

	authToken.$inject = ['$window'];
    
	function authToken($window){

		var storage = $window.localStorage;
		var cacheToken;
		var userToken = "userToken";

		var service = {
			setToken: setToken,
			getToken: getToken,
			removeToken: removeToken,
			isAuthenticate: isAuthenticate,
			getCurrentUser: getCurrentUser
		};

		return service;

		function getCurrentUser(){

		}

		function setCurrentUser(user){

		}

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


})();