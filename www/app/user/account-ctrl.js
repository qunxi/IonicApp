(function(){

	angular.module('mobileApp').controller('AccountCtrl', AccountCtrl);

	AccountCtrl.$inject = ['authToken', '$state'];

	function AccountCtrl(authToken, $state){

		var vm = this;
		
		vm.isAuthenticated = authToken.isAuthenticated();

		
		if(!vm.isAuthenticated){
			$state.go('login');
		}


		vm.logout = logout;

		function logout(){

			authToken.removeToken();
			$state.go('login');
		}
	}

})();