(function() {
    'use strict';

    angular
        .module('mobileApp')
        .factory('userService', userService);

    userService.$inject = ['$http', 'authToken', '$state', 'API_URL'];

    function userService($http, authToken, $state, API_URL) {

        var service = {
            checkUser: checkUser,
            checkPassword: checkPassword,
            checkPasswordEqual: checkPasswordEqual,
            checkEmail: checkEmail,
            changePassword: changePassword
        };

        return service;


        function changePassword(originPassword, newPassword){
            var url = API_URL + 'user/changePassword';
            
            return $http.post(url, { token: authToken.getToken(), 
                                     originPassword: originPassword,
                                     newPassword: newPassword})
                        .then(function(res){
                            return res.data;
                        }, function(res){
                            return res.data;
                        });
        }


        function checkUser(username) {
            var reg = new RegExp('^[a-zA-Z0-9-_]{4,30}$', 'g');
            return reg.test(username) || !username.length;
        }

        function checkPassword(password) {
            var reg = new RegExp('^[\\W\\w]{6,15}$', 'g');
            return reg.test(password) || !password.length;
        }

        function checkPasswordEqual(password1, password2) {
            return password1 === password2 || !password2.length;
        }

        function checkEmail(email) {
            var reg = new RegExp('^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$',
                'g');
            return reg.test(email) || !email.length;
        }

    }
})();