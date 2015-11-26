(function(){

	angular.module('mobileApp').controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['authToken', '$state', 'authenticate', '$ionicPopup', 'userService'];

	function LoginCtrl(authToken, $state, authenticate, $ionicPopup, userService){
		var vm = this;

		vm.password = '';
		vm.username = '';
		vm.login = login;


        if(authToken.isAuthenticated()){
            $state.go('app.account');
        }

		function validation(){
			return checkPassword() && checkUserName();
		}

		function checkUserName() {
            return userService.checkUser(vm.username);
        }

        function checkPassword() {
            return userService.checkPassword(vm.password);
        }

        function login(){
        	
        	if(!validation()){
        		$ionicPopup.alert({
                    title: 'MessageBox',
                    content: 'please enter correct information'
                });
                return;
        	}

            function loginCallback(data){
                if(data){
                    $ionicPopup.alert({
                        title: 'ErrorMessage',
                        content: data.status + ', ' + data.message
                    });
                }
                else{
                    $state.go('app.account');
                }
            }

        	authenticate.login(vm.username, vm.password, loginCallback);
        }

	}


})();