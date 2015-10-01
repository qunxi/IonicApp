(function() {
    'use strict';

    angular.module('custom-service')
        .factory('authToken', authToken);

    authToken.$inject = ['$window'];

    function authToken($window) {

        var storage = $window.localStorage;
        var cacheToken;
        var cacheUser;
        var userToken = "userToken";
        var userInfo = "userInfo";

        var service = {
            setToken: setToken,
            getToken: getToken,
            removeToken: removeToken,
            isAuthenticated: isAuthenticated,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            removeCurrentUser: removeCurrentUser
        };

        return service;

        function getCurrentUser() {
        	if(!cacheUser)
        		cacheUser =  JSON.parse(storage.getItem(userInfo));
        	return cacheUser;
        }

        function removeCurrentUser(){
        	cacheUser = null;
        	storage.removeItem(userInfo);
        }

        function setCurrentUser(user) {
        	
        	cacheUser = user;
        	storage.setItem(userInfo, JSON.stringify(user));
        }

        function setToken(token) {
            cacheToken = token;
            storage.setItem(userToken, token);
        }

        function getToken() {
            if (!cacheToken){
                cacheToken = storage.getItem(userToken);
            }
            
            return cacheToken;
        }

        function isAuthenticated() {
            return !!getToken();
        }

        function removeToken() {
            cacheToken = null;
            storage.removeItem(userToken);
        }
    }
})();