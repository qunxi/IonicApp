(function() {
    'use strict';

    angular.module('custom-service')
        .factory('authToken', authToken);

    authToken.$inject = ['CacheFactory'];

    function authToken(CacheFactory) {

        //var cacheToken;
        var cacheUser;
        var userInfo = "userInfo";
        var userCache = "userCache";


        var service = {
            getToken: getToken,
            isAuthenticated: isAuthenticated,
            getCurrentUserInfo: getCurrentUserInfo,
            setCurrentUser: setCurrentUser,
            removeCurrentUser: removeCurrentUser
        };

        var cache = CacheFactory.createCache(userCache, {
            storageMode: 'localStorage',
            deleteOnExpire: 'aggressive'
        });

 
        return service;


        function getCurrentUserInfo(){
            if(!cacheUser){
               cacheUser = cache.get(userInfo);
              
            }
            return !cacheUser ? null : cacheUser.user;
        }

        function getToken() {
            if(!cacheUser){
                cacheUser = cache.get(userInfo);
            }
            return !cacheUser ? null : cacheUser.token;
        }


        function removeCurrentUser(){
        	cacheUser = null;
        	cache.remove(userInfo);
        }

        function setCurrentUser(user) {
        	cacheUser = user;
        	cache.put(userInfo, user);
        }

        function isAuthenticated() {
            return !!getToken();
        }

    }
})();