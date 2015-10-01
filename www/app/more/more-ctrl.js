(function(){

	angular.module('mobileApp').controller('MoreCtrl', MoreCtrl);

	MoreCtrl.$inject = ['authToken'];

	function MoreCtrl(authToken){
		var vm = this;

		vm.isAuthenticated = authToken.isAuthenticated();
	}

})();