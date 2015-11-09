(function(){

	angular.module('mobileApp').controller('AccountCtrl', AccountCtrl);

	AccountCtrl.$inject = ['authToken', '$state',  '$ionicPopup', 'rssCache'];

	function AccountCtrl(authToken, $state, $ionicPopup, rssCache){

		var vm = this;
		
		vm.isAuthenticated = authToken.isAuthenticated();
		vm.logout = logout;
		vm.removeCache = removeCache;
		
		if(!vm.isAuthenticated){
			$state.go('app.login');
		}
		
		function removeCache(){
			var popupConfirm = $ionicPopup.confirm({
				title: 'MessageBox',
				template: 'Do you really want to remove local cache data?'
			});

			popupConfirm.then(function(res){
				if(res){
					rssCache.removeRssFeedListCache();
					rssCache.removeRssCatelogCache();
				}
			});
		}
		

		function logout(){

			authToken.removeCurrentUser();
			$state.go('app.login');
		}
	}

})();