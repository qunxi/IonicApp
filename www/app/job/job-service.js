(function(){
	angular.module('mobileApp').factory('jobService', jobService);

	jobService.$inject = ['API_URL', '$http', 'formatService'];

	function jobService(API_URL, $http, formatService){
		var service = {
			getJobs: getJobs
		};

		return service;

		function getJobs(query, location, page, limit){

			if(!!query && !!location && !!limit){
				var queryParams = encodeURIComponent(query + ' 软件开发') + '&city=' + encodeURIComponent(location) +
								  '&page=' + encodeURIComponent(page) + '&limit=' + encodeURIComponent(limit);

				var url = API_URL + 'jobs?query=' + queryParams;
				console.log(url);
				return $http.get(url)
					.then(function success(res){
						return _.map(res.data, function(n){
							n.description = formatService.cuttingString(n.description, 50);
							return n;
						});
					}, function error(res){					
					});
			}
		}
	}

})();