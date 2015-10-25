(function(){
	angular.module('custom-service').factory('loadingService', loadingService);

	loadingService.$inject = ['$ionicLoading'];

	function loadingService($ionicLoading){
		var service = {
			show: show,
			hide: hide
		};

		return service;

		function show(){
			$ionicLoading.show({
				template: 'loading'
			});
		}

		function hide(){
			$ionicLoading.hide();
		}
	}
})();