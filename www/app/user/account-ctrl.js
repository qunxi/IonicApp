(function(){

	angular.module('mobileApp').controller('AccountCtrl', AccountCtrl);

	AccountCtrl.$inject = ['authToken', '$state',  '$ionicPopup', 'userService', 'utilsService', 'rssCache'];

	function AccountCtrl(authToken, $state, $ionicPopup, userService, utilsService, rssCache){

		var vm = this;
		
		vm.isAuthenticated = authToken.isAuthenticated();
		
		
		vm.username = authToken.getCurrentUserInfo() ? authToken.getCurrentUserInfo().username : '';
		vm.email = authToken.getCurrentUserInfo() ? authToken.getCurrentUserInfo().email : '';

		vm.changePasswordElements = {
				'originPassword': {
                    type: 'password',
                    model: '',
                    icon: 'icon ion-locked placeholder-icon',
                    tip: 'Enter origin password',
                    error: 'the password is not correctly',
                    placeholder: 'Origin Password',
                    check: checkOriginPassword
                },
               'password': {
                    type: 'password',
                    model: '',
                    icon: 'icon ion-locked placeholder-icon',
                    tip: '6-16 characters, include digit, letter(case sensitive), sign',
                    error: 'Please enter valid password',
                    placeholder: 'Password',
                    check:checkPassword
                },
                'passwordAgain': {
                    type: 'password',
                    model: '',
                    icon: 'icon ion-locked placeholder-icon',
                    tip: 'Enter it again',
                    error: 'Password are not equal',
                    placeholder: 'Password Again',
                    check: checkPasswordEqual
                }
            };

      	

      	vm.logout = logout;
		vm.removeCache = removeCache;
		vm.changPassword =  changPassword;


		if(!vm.isAuthenticated){
			$state.go('app.login');
		}

		function changPassword(){

			if(!validation()){
				var popupAlert = $ionicPopup.alert({
									title: 'MessageBox',
									content: 'Please enter password correctly'
								});
				return;
			}

			var originPassword = vm.changePasswordElements.originPassword.model;
			var newPassword = vm.changePasswordElements.password.model;

			userService.changePassword(originPassword, newPassword)
					   .then(function(data){
					   	 	if(utilsService.isErrorObject(data)){
					   	 		var popupAlert = $ionicPopup.alert({
									title: 'MessageBox',
									content: 'Password changed is failed, please check your origin password or network'
								});
					   	 	}
					   	 	else{
					   	 		logout();
					   	 	}
					   });
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
					rssCache.removeLatestPostsCache();

				}
			});
		}

		function logout(){
			authToken.removeCurrentUser();
			$state.go('app.login');
		}

		function checkOriginPassword(){
			return userService.checkPassword(vm.changePasswordElements.originPassword.model);
		}

		function checkPassword(){
			return userService.checkPassword(vm.changePasswordElements.password.model);
		}

		function checkPasswordEqual(){
			return userService.checkPasswordEqual(vm.changePasswordElements.password.model, 
										vm.changePasswordElements.passwordAgain.model);
		}

		function validation(){
			return checkOriginPassword() && checkPassword() && checkPasswordEqual();
		}
		
	}

})();