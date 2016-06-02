(function(){
	'use strict';
	
	angular
		.module('mobileApp')
		.factory('rssService', rssService);

	rssService.$inject = ['$http', 'authToken', 'API_URL', 'rssCache', 'formatService'];

	function rssService($http, authToken, API_URL, rssCache, formatService){
		
		var service = {
			subscrible : subscrible,
			getCatelogs: getCatelogs,
			addRssCatelog: addRssCatelog,
			removeCatelogs: removeCatelogs,
			searchRssCatelog: searchRssCatelog,
			getFeedsByCatelogId: getFeedsByCatelogId,
			getLocalCatelogs: getLocalCatelogs,
			getLocalFeedList: getLocalFeedList,
			getFeedCotentById: getFeedCotentById,
			removeLocalCatelogs: removeLocalCatelogs,
			getLocalLatestPosts: getLocalLatestPosts,
			getAllFeedsByDate: getAllFeedsByDate,
			preProcessFeedList: preProcessFeedList
		};

		return service;

		function subscrible(address){
			var url = API_URL + 'rss';
			
			return $http.post(url, {token: authToken.getToken(), link:address})
						.then(function(res){
							return updateRssCache(res.data);
						},
						function(res){
							return [];
						});
		}

		function getCatelogs(userToken){

			var url = API_URL + 'rss/catelog';
			
			return $http.get(url, {params: {token: userToken}})
						.then(function(res){
							return updateRssCache(res.data);
						},
						function(res){
							console.log(res.data);
							return [];
						});
			
		}

		function getFeedsByCatelogId(catelogid, page, limit){
			var url = API_URL + 'rss/items';
			
			return $http.get(url, {params:{catelogId:catelogid, page: page, limit: limit}})
						.then(function(res){
							return updateFeedListCache(catelogid, res.data);
						},
						function(res){
							return [];
						});
		}


		function getAllFeedsByDate(page, limit){
			var url = API_URL + 'posts';
			console.log(url);
			return $http.get(url, {params: {page: page, limit: limit}})
					.then(function(res){
						return updateLocalLatestPosts(res.data.items);
					},
					function(res){
						return [];				
					});
		}


		function removeCatelogs(catelogs){
			var url = API_URL + 'rss/removeCatelogs';
			
			return $http.post(url, {token: authToken.getToken(),catelogIds : catelogs})
						.then(function(res){
							return removeLocalCatelogs(catelogs);
						}, function(res){
							return removeLocalCatelogs(catelogs);
						});
				
		}


		function getFeedCotentById(id){
			var url = API_URL + 'rss/itemContent';
			return $http.get(url, {params:{itemId: id}})
						.then(function(res){
							console.log(res);
							return res.data;
						},
						function(res){
							return [];
						});
		}

		function searchRssCatelog(query){
			var url = API_URL + 'rss/search';
			return $http.get(url, {params: {q: query}})
						.then(function(res){
							return res.data;
						}, function(res){
							console.log(res.data);
							return [];
						});
		}

		function addRssCatelog(id){
			var url = API_URL + 'rss/catelog';
			return $http.post(url, {token: authToken.getToken(), catelogId: id})
						.then(function(res){
							return res.data;
						}, function(res){
							console.log(res.data);
							return -1;
						});
		}

		//process local cache 
		function removeLocalCatelogs(catelogIds){
			var rssCatelogCache = rssCache.getRssCatelogCache();
		 	rssCatelogCache = _.chain(rssCatelogCache)
							   .filter(function(n){
								 	return !_.find(catelogIds, function(id){
								 		return id === n._id;
								 	});
								})
							   .value();
			rssCache.updateRssCatelogCache(rssCatelogCache);
			return rssCatelogCache;
		}

		function getLocalCatelogs(){

			var rssCatelogCache = rssCache.getRssCatelogCache();
			if(!!rssCatelogCache && rssCatelogCache.length){
				
				return rssCatelogCache;
			}
			return [];
		}

		function getLocalFeedList(catelogId){
			var rssFeedListCache = rssCache.getRssFeedListCache();

			if(!!rssFeedListCache && !!rssFeedListCache[catelogId]){
				return rssFeedListCache[catelogId].items;
			}
			return [];
		}

		function getLocalLatestPosts(){

			var latestPosts = rssCache.getLatestPostsCache();
			
			if(!!latestPosts && latestPosts.length){
				
				return latestPosts;
			}

			return [];
		}

		//private
		function uniqMergeList(dataNet, dataLocal){
			var mergeList = [];

			if(dataLocal instanceof Array){
				mergeList = dataLocal.concat(dataNet);
				mergeList = _.chain(mergeList)
							 .uniqBy(function(n){
				 				return n._id;
							 })
							 .value();
			}
			else{
				mergeList = dataNet;
			}
			return mergeList;
		}

		function updateFeedListCache(catelogId, feedListData){
			var rssFeedList = getLocalFeedList(catelogId);
			var mergeList = uniqMergeList(feedListData, rssFeedList);
			var rssFeedListCache = rssCache.getRssFeedListCache() ?  rssCache.getRssFeedListCache() : {};
			rssFeedListCache[catelogId] = {items: mergeList};
		
			rssCache.updateRssFeedListCache(rssFeedListCache);
			return mergeList;
		}

		function updateRssCache(data){
			var rssCatelogCache = rssCache.getRssCatelogCache();
			var mergeList = uniqMergeList(data, rssCatelogCache);
			rssCache.updateRssCatelogCache(mergeList);
			return mergeList;
		}

		function updateLocalLatestPosts(data){
			//var posts = formatHotPosts(data);
			console.log(data);
			if(!!data && data.length){
				var latestPosts = rssCache.getLatestPostsCache();
				var mergeList = uniqMergeList(data, latestPosts);
				console.log(mergeList);
				rssCache.updateLatestPostsCache(mergeList);
				return mergeList;
			}
			return getLocalLatestPosts();
		}

		function preProcessFeedList(data) {

            return	_.chain(data)
	                .map(function(n) {
	                    n.title = formatService.cuttingString(n.title, 50);
	                    n.thumbPic = n.images.length > 0 ? n.images[0] : '/img/noPictrue.jpg';
	                    n.updated = formatService.formatDate(n.updated);
	                    return n;
	                })
	                .value();
        }
	}

})();