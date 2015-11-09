(function(){

	angular.module('mobileApp').controller('MoreCtrl', MoreCtrl);

	MoreCtrl.$inject = ['authToken', 'moreService', '$ionicPopup'];

	function MoreCtrl(authToken, moreService, $ionicPopup){
		var vm = this;

		vm.isAuthenticated = authToken.isAuthenticated();
		vm.feedback = '';

		vm.submitFeedback = function(){
			moreService.submitFeedback(vm.feedback)
					   .then(function(data){
					   		$ionicPopup.alert({
                    			title: 'MessageBox',
                    			content: data.message
                			});
					   });
		};
	}

})();