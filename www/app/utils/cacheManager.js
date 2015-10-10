(function(){
	'use strict';

	angular.module('mobileApp').factory('cacheManager', cacheManager);


	cacheManager.$inject = ['CacheFactory'];

	function cacheManager(CacheFactory){
		
		var service = {
			getCache: getCache
		};

		return service;


		function getCache(cacheId, config){

			if(!CacheFactory.get(cacheId)){
				CacheFactory.createCache(cacheId,config);
			}

			return CacheFactory.get(cacheId);
		}
	}

})();