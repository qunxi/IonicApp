(function(){

	angular
		.module('mobileApp')
		.factory('stockService', stockService);

	stockService.$inject = ['$http', 'API_URL'];

	function stockService($http, API_URL){
		var service = {
			searchAutoComplete : searchAutoComplete,
			setFavorite: setFavorite
		};

		return service;

		function searchAutoComplete(query, callback){
			
			var url = API_URL + 'stocks/search?query=' + query;
			
			$http.get(url)
				.then(function success(res){
					callback(res.data);
				}, function error(res){
					callback({
						status: res.status,
						message: res.error.message
					});					
				});
		}

		function setFavorite(stockId){

		}
	}

})();