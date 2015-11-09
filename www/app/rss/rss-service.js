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
			removeLocalCatelogs: removeLocalCatelogs
		};

		return service;

		function subscrible(address){
			var url = API_URL + 'rss';
			
			return $http.post(url, {token: authToken.getToken(), link:address})
						.then(function(res){
							return updateRssCache(res.data);
						},
						function(res){
							console.log(res.data);
							return [];
						});
		}

		function getCatelogs(userToken){

			var url = API_URL + 'rss/catelog';
			
			return $http.get(url, {params: {token: userToken}})
						.then(function(res){
							//console.log(res.data);
							return updateRssCache(res.data);
						},
						function(res){
							console.log(res.data);
							return [];
							//return error;
						});
			
		}

		function getFeedsByCatelogId(catelogid, page, limit){
			var url = API_URL + 'rss/items';
			
			return $http.get(url, {params:{catelogId:catelogid, page: page, limit: limit}})
						.then(function(res){
							return updateFeedListCache(catelogid, res.data);
						},
						function(res){
							console.log(res.data);
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
							return res.data;
						},
						function(res){
							console.log(res.data);
							return [];
						});
		}

		function searchRssCatelog(query){
			var url = API_URL + 'rss/search';
			console.log(url);
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
			//console.log('before', rssCatelogCache);

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
			console.log(rssCatelogCache);
			if(!!rssCatelogCache && rssCatelogCache.length){
				
				return rssCatelogCache;
			}
			return [];
		}

		function getLocalFeedList(catelogId){
			var rssFeedListCache = rssCache.getRssFeedListCache();
			if(!!rssFeedListCache && rssFeedListCache.length){
				return _.filter(rssFeedListCache, function(n){
					return n.catelogId === catelogId;

				});
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
			var rssFeedListCache = getLocalFeedList(catelogId);
			var mergeList = uniqMergeList(feedListData, rssFeedListCache);
			rssCache.updateRssFeedListCache(mergeList);
			return mergeList;
		}


		function updateRssCache(data){
			var rssCatelogCache = rssCache.getRssCatelogCache();
			var mergeList = uniqMergeList(data, rssCatelogCache);
			rssCache.updateRssCatelogCache(mergeList);
			return mergeList;
		}

	}

})();