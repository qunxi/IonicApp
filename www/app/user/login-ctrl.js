(function(){

	angular.module('mobileApp').controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['authToken', 'authenticate', '$ionicPopup'];

	function LoginCtrl(authToken, authenticate, $ionicPopup){
		var vm = this;

		vm.password = '';
		vm.username = '';
		vm.login = login;

		function validation(){
			return checkPassword() && checkUserName();
		}

		function checkUserName() {
            var reg = new RegExp('^[a-zA-Z0-9-_]{4,30}$', 'g');
            return reg.test(vm.username);
        }

        function checkPassword() {
            var reg = new RegExp('^[\\W\\w]{6,15}$', 'g');
            return reg.test(vm.password);
        }

        function login(){
        	
        	if(!validation()){
        		$ionicPopup.alert({
                    title: 'MessageBox',
                    content: 'please enter correct information'
                });
                return;
        	}

        	var res = authenticate.login(vm.username, vm.password)
        	.then(function(error){
                if (error) {
                    $ionicPopup.alert({
                        title: 'ErrorMessage',
                        content: error.status + ', ' + error.message
                    });
                }
        	});
        	
        

        }
	}


})();