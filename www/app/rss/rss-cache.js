(function(){
	'use strict';

	angular.module('mobileApp').factory('rssCache', rssCache);


	rssCache.$inject = ['CacheFactory'];

	function rssCache(CacheFactory){

		var service = {
			getRssCatelogCache: getRssCatelogCache,
			removeRssCatelogCache: removeRssCatelogCache,
			updateRssCatelogCache: updateRssCatelogCache,
			getRssFeedListCache: getRssFeedListCache,
			updateRssFeedListCache: updateRssFeedListCache,
			removeRssFeedListCache: removeRssFeedListCache,
			getLatestPostsCache: getLatestPostsCache,
			removeLatestPostsCache: removeLatestPostsCache,
			updateLatestPostsCache: updateLatestPostsCache,
		};

		var caches = {
			'rssCatelogCache':{
				cacheId: 'rssCatelogCache',
				config: {
					storageMode: 'localStorage',
					deleteOnExpire: 'aggressive'
	        	}
			},
			'rssFeedListCache':{
				cacheId: 'rssFeedListCache',
				config: {
					storageMode: 'localStorage',
					deleteOnExpire: 'aggressive'
	        	}
			},
			'latestPostsCache':{
				cacheId: 'latestPostsCache',
				config: {
					storageMode: 'localStorage',
					deleteOnExpire: 'aggressive'
	        	}
			}
		};

		return service;

		function getRssFeedListCache(){
			return getCache(caches.rssCatelogCache.cacheId).get('rssFeedListData');
		}

		function removeRssFeedListCache(){
			return getCache(caches.rssCatelogCache.cacheId).remove('rssFeedListData');
		}

		function updateRssFeedListCache(rssFeedListData){
			 getCache(caches.rssCatelogCache.cacheId)
					.put('rssFeedListData', rssFeedListData);
		}

		function getLatestPostsCache(){
			return getCache(caches.latestPostsCache.cacheId).get('latestPostsData');
		}

		function removeLatestPostsCache(){
			return getCache(caches.latestPostsCache.cacheId).remove('latestPostsData');
		}

		function updateLatestPostsCache(latestPostsData){
			 getCache(caches.latestPostsCache.cacheId)
					.put('latestPostsData', latestPostsData);
		}



		function getRssCatelogCache(){
			return getCache(caches.rssCatelogCache.cacheId).get('rssCatelogData');
		}

		function removeRssCatelogCache(){
			return getCache(caches.rssCatelogCache.cacheId).remove('rssCatelogData');
		}

		function updateRssCatelogCache(rssCatelogData){
			 getCache(caches.rssCatelogCache.cacheId)
					.put('rssCatelogData', rssCatelogData);
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