(function(){

	angular.module('mobileApp').controller('AccountCtrl', AccountCtrl);

	AccountCtrl.$inject = ['authToken', '$state', '$ionicHistory'];

	function AccountCtrl(authToken, $state, $ionicHistory){

		var vm = this;
		
		vm.isAuthenticated = authToken.isAuthenticated();

		
		if(!vm.isAuthenticated){
			//console.log($ionicHistory.viewHistory());
			//if($ionicHistory.backview === null)
				//$state.go('app.home');
			$state.go('app.login');
			//console.log($ionicHistory.viewHistory());
		}
		
		vm.logout = logout;

		function logout(){

			authToken.removeToken();
			$state.go('app.login');
		}
	}

})();