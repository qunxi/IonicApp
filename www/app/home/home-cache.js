(function(){
	'use strict';

	angular.module('mobileApp').factory('homeCache', homeCache);

	homeCache.$inject = ['CacheFactory'];

	function homeCache(CacheFactory){

		var service = {
			getHotJobCache: getHotJobCache,
			updateHotJobCache: updateHotJobCache,
			removeHotJobCache: removeHotJobCache
		};

		var caches = {
			'hotJobCache':{
				cacheId: 'hotJobCache',
				config: {
					storageMode: 'localStorage',
					deleteOnExpire: 'aggressive'
	        	}
			}
		};

		return service;

		function getHotJobCache(){
			return getCache(caches.hotJobCache.cacheId).get('hotJobData');
		}

		function removeHotJobCache(){
			return getCache(caches.hotJobCache.cacheId).remove('hotJobData');
		}

		function updateHotJobCache(hotJobData){
			 getCache(caches.hotJobCache.cacheId)
					.put('hotJobData', hotJobData);
		}

		function getCache(cacheId){

			if(!CacheFactory.get(cacheId) && caches[cacheId]){
				CacheFactory.createCache(cacheId, caches[cacheId].config);
			}

			return CacheFactory.get(cacheId);
		}





	}
}
)();