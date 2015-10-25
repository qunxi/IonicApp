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
			removeCatelogs: removeCatelogs,
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
							console.log(res);
							return updateRssCache(res.data);
						},
						function(error){
							return error;
						});
		}

		function getCatelogs(userToken){

			var url = API_URL + 'rss/catelog';
			
			return $http.get(url,{params: {token: userToken}})
						.then(function(res){
							console.log(res);
							return updateRssCache(res.data);
						},
						function(error){
							return error;
						});
			
		}

		function getFeedsByCatelogId(catelogid){
			var url = API_URL + 'rss/feeds';
			
			return $http.get(url, {params:{catelogId:catelogid}})
						.then(function(res){
							return updateFeedListCache(res.data);
						},
						function(error){
							return error;
						});
		}

		function removeCatelogs(catelogs){
			var url = API_URL + 'rss/removeCatelogs';
			
			return $http.post(url, {catelogIds : catelogs})
						.then(function(res){
							return removeLocalCatelogs(res.data);
						}, function(res){
							console.log(res);
							return removeLocalCatelogs(catelogs);
							//return {error: 'the server operation failed'};
						});
				
		}


		function getFeedCotentById(id){
			var url = API_URL + 'rss/feedContent';
			return $http.get(url, {params:{feedId: id}})
						.then(function(res){
							//return updateFeedListCache(res.data);
							//console.log(res.data);
							return res.data.content;
						},
						function(error){
							return error;
						});
		}

		//process local cache 
		function removeLocalCatelogs(catelogIds){
			var rssCatelogCache = rssCache.getRssCatelogCache();
			console.log('before', rssCatelogCache);

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
		function updateFeedListCache(feedListData){
			var rssFeedListCache = rssCache.getRssFeedListCache();
			var mergeList = [];
			if(!!rssFeedListCache && rssFeedListCache.length){
				mergeList = feedListData.concat(rssFeedListCache);
				
				mergeList = _.chain(mergeList)
							 .uniqBy(function(n){
				 				return n._id;
							 })
							 .value();
			}
			else{
				mergeList = feedListData;
			}
			rssCache.updateRssFeedListCache(mergeList);
			return mergeList;
		}


		function updateRssCache(data){
			var rssCatelogCache = rssCache.getRssCatelogCache();
			
			console.log(data);

			var mergeList = [];
			if(!!rssCatelogCache && rssCatelogCache.length){
				if(!(data instanceof Array)){
					mergeList = [data];
				}
				mergeList = mergeList.concat(rssCatelogCache);
				mergeList = _.chain(mergeList)
							 .uniqBy(function(n){
				 				return n._id;
							 })
							 .value();
			}
			else{
				if(!(data instanceof Array)){
					mergeList = [data];
				}
				else{
					mergeList = data;
				}
			}
		
			
			rssCache.updateRssCatelogCache(mergeList);
			
			return mergeList;
		}

	}

})();