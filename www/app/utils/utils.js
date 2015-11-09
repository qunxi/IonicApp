(function(){
	angular.module('mobileApp').factory('utilsService', utilsService);

	function utilsService(){
		var service = {
			isErrorObject: isErrorObject
		};

		return service;

		function isErrorObject(data){
			
			console.log(data);
			return !!data && data.hasOwnProperty('error');
		}

	}

})();