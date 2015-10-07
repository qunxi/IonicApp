(function() {
    'use strict';

    angular
        .module('custom-service')
        .factory('authenticate', authenticate);

    authenticate.$inject = ['$http', 'authToken', '$state', 'API_URL'];

    function authenticate($http, authToken, $state, API_URL) {

        //var API_URL = "http://localhost:3000/"; //according concret project to setup

        var service = {
            login: login,
            register: register,
            logout: logout
        };

        return service;


        function login(username, password, callback) {
            return $http.post(API_URL + 'login', {
                    username: username,
                    password: password
                })
                .then(function success(res, callback) {
                        authSuccessful(res.data, callback);
                    },
                    function error(res, callback) {
                    	authFailed(res, callback);
                    });
        }

        function logout() {
            authToken.removeToken();
            authToken.removeCurrentUser();
        }

        function register(username, password, email, callback) {
           
            $http.post(API_URL + 'register', {
                    username: username,
                    password: password,
                    email: email })
            	 .then(function success(res) { 
                        authSuccessful(res.data, callback);
                    }, function error(res) {
                        authFailed(res, callback);
                    });
        }

        function authFailed(res, callback){
            callback({
                status: res.status,
                message: res.data.message
            });
        }

        function authSuccessful(data, callback) {
        	
            authToken.setToken(data.token);
           
            authToken.setCurrentUser(data.user);

            callback();
            //$state.go('app.home');
        }
    }

})();