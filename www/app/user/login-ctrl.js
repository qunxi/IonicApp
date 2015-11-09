(function(){

	angular.module('mobileApp').controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['authToken', '$state', 'authenticate', '$ionicPopup', '$ionicPlatform','$ionicHistory'];

	function LoginCtrl(authToken, $state, authenticate, $ionicPopup, $ionicPlatform, $ionicHistory){
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