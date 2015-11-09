(function(){
	'use strict';
	
	angular
		.module('mobileApp')
		.factory('moreService', moreService);

	moreService.$inject = ['$http', 'authToken', 'API_URL', 'utilsService'];

	function moreService($http, authToken, API_URL, utilsService){
		var service = {
			submitFeedback: submitFeedback
		};

		return service;

		function submitFeedback(message){
			var url = API_URL + 'contract/feedback';
			
			return $http.post(url, {token: authToken.getToken(), message: message})
						.then(function(res){
							if(!utilsService.isErrorObject(res.data)){
								return {
									message: 'Submit feedback successful'
								};
							}else{
								return {
									message: 'There is a prbolem happened ' + res.data.message
								};
							}
						},
						function(res){
							return {
									message: 'There is a prbolem happened ' + res.data
								};
						});
		}
	}


})();