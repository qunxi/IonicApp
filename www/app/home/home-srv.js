(function(){

	angular.module('mobileApp').factory('homeService', homeService);

	homeService.$inject = ['API_URL', '$http', 'formatService', 'homeCache'];

	function homeService(API_URL, $http, formatService, homeCache){
		var service = {
			getLatestJobs: getLatestJobs,
			getLatestPosts: getLatestPosts,
			getLocalHotJobs: getLocalHotJobs,
			getLocalHotPosts: getLocalHotPosts
		};

		return service;

		function getLatestJobs(){
			var url = API_URL + 'favorJobs';
			return $http.get(url)
					.then(function success(res){
						homeCache.updateHotJobCache(res.data);
						return getLocalHotJobs();
					}, function error(res){					
					});
		}

		function getLatestPosts(){
			var url = API_URL + 'posts';
			return $http.get(url, {params:{page: 0, limit: 6}})
					.then(function(res){
						return updateLocalHotPosts(res.data);
					}, 
					function(res){					
					});
		}

		function updateLocalHotPosts(data){
			var posts = formatHotPosts(data);
			if(!!posts && posts.length){
				homeCache.updateHotPostCache(posts);
				return posts;
			}
			return getLocalHotPosts();
		}

		function formatHotPosts(data){
			if(!!data && data.length){
				return _.map(data, function(n){
	                    n.thumbPic = n.images.length > 0 ? n.images[0] : '/img/noPictrue.jpg';
	                    n.updated = formatService.formatDate(n.updated);
	                    return n;
					});
			}
			return [];
		}


		function getLocalHotJobs(data){
			var hotJobs = homeCache.getHotJobCache();
			
			if(!!hotJobs && hotJobs.length){
				
				return hotJobs;
			}
			return [];
		}

		function getLocalHotPosts(){

			var hotPosts = homeCache.getHotPostCache();
			
			if(!!hotPosts && hotPosts.length){
				
				return hotPosts;
			}
			return [];
		}
	}

})();