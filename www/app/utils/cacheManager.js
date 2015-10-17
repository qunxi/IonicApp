(function(){
	'use strict';

	angular.module('mobileApp').factory('cacheManager', cacheManager);


	cacheManager.$inject = ['CacheFactory'];

	function cacheManager(CacheFactory){
		
		var service = {
			getSearchHistoriesCache: getSearchHistoriesCache,
			getFavorStocksCache: getFavorStocksCache,
			
			removeSearchHistoriesCache: removeSearchHistoriesCache,
			removeFavorStocksCache: removeFavorStocksCache,

			updateFavorStocksCache: updateFavorStocksCache,
			updateSearchHistoriesCache: updateSearchHistoriesCache
		};

		var caches = {
			'favorStocksCache':{
				cacheId: 'favorStocksCache',
				config: {
					storageMode: 'localStorage',
					deleteOnExpire: 'aggressive'
	        	}
			},
			'getSearchHistoriesCache':{
				cacheId: 'getSearchHistoriesCache',
				config: {
					storageMode: 'localStorage',
					deleteOnExpire: 'aggressive'
	        	}
			}
		};

		return service;

		//favorite stocks cache
		function getFavorStocksCache(){
			return getCache(caches.favorStocksCache.cacheId).get('favorStocksData');
		}

		function removeFavorStocksCache(){
			return getCache(caches.favorStocksCache.cacheId).remove('favorStocksData');
		}

		function updateFavorStocksCache(favorStocksData){
			 getCache(caches.favorStocksCache.cacheId)
					.put('favorStocksData', favorStocksData);
		}

		//search stocks cache
		function getSearchHistoriesCache(){
			return getCache(caches.getSearchHistoriesCache.cacheId).get('searchHistoriesData');
		}
		
		function removeSearchHistoriesCache(){
			console.log('remove');
			return getCache(caches.getSearchHistoriesCache.cacheId).remove('searchHistoriesData');
		}	

		function updateSearchHistoriesCache(searchHistoriesData){
			getCache(caches.getSearchHistoriesCache.cacheId)
					.put('searchHistoriesData', searchHistoriesData);
		}

		function getCache(cacheId){

			if(!CacheFactory.get(cacheId) && caches[cacheId]){
				CacheFactory.createCache(cacheId, caches[cacheId].config);
			}

			return CacheFactory.get(cacheId);
		}
	}

})();