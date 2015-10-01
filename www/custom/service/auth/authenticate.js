(function() {
    'use strict';

    angular
        .module('custom-service')
        .factory('authenticate', authenticate);

    authenticate.$inject = ['$http', 'authToken', '$state'];

    function authenticate($http, authToken, $state) {

        var API_URL = "http://localhost:3000/"; //according concret project to setup

        var service = {
            login: login,
            register: register,
            logout: logout
        };

        return service;


        function login(username, password) {
            return $http.post(API_URL + 'login', {
                    username: username,
                    password: password
                })
                .then(function success(res) {
                        authSuccessful(res.data);
                    },
                    function error(res) {
                    	console.log(res);
                    	return {
                    		status: res.status,
                    		message: res.data.message
                    	};
                    });
        }

        function logout() {
            authToken.removeToken();
            authToken.removeCurrentUser();
        }

        function register(username, password, email) {
           
            $http.post(API_URL + 'register', {
                    username: username,
                    password: password,
                    email: email })
            	 .then(function success(res) { authSuccessful(res.data); }, function error(res) {
                        console.log(res.data.message);
                        return {
                    		status: res.status,
                    		message: res.data.message
                    	};
                    });
        }

        function authSuccessful(res) {
        	
            authToken.setToken(res.token);
           
            authToken.setCurrentUser(res.user);
            $state.go('app.home');
        }
    }

})();