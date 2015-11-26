(function() {
    'use strict';

    angular.module('mobileApp')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['authenticate', '$ionicPopup', 'userService'];

    function RegisterCtrl(authenticate, $ionicPopup, userService) {

        var vm = this;

        //vm.register = {};
        vm.registerData = initalRegistration();
        vm.signIn = signIn;

        function initalRegistration() {
            return {
                'username': {
                    type: 'text',
                    model: '',
                    icon: 'icon ion-person placeholder-icon',
                    tip: '4-30 characters, include letter, digit, - and _. you can\'t change anymore if register successfully',
                    error: 'Please enter correct user name',
                    placeholder: 'User Name',
                    check: checkUser
                },
                'password': {
                    type: 'password',
                    model: '',
                    icon: 'icon ion-locked placeholder-icon',
                    tip: '6-16 characters, include digit, letter(case sensitive), sign',
                    error: 'Please enter valid password',
                    placeholder: 'Password',
                    check: checkPassword
                },
                'passwordAgain': {
                    type: 'password',
                    model: '',
                    icon: 'icon ion-locked placeholder-icon',
                    tip: 'Enter it again',
                    error: 'Password are not equal',
                    placeholder: 'Password Again',
                    check: checkPasswordEqual
                },
                'email': {
                    type: 'email',
                    model: '',
                    icon: 'icon ion-email placeholder-icon',
                    tip: 'Use legal eamil, you can change the password if you forget email',
                    error: 'Please enter correct email',
                    placeholder: 'Eamil',
                    check: checkEmail
                }
            };
        }


        function checkUser() {
            return userService.checkUser(vm.registerData.username.model);
        }

        function checkPassword() {
            return userService.checkPassword(vm.registerData.password.model);
        }

        function checkPasswordEqual() {
            return 	userService.checkPasswordEqual(vm.registerData.password.model, vm.registerData.passwordAgain.model);
        }

        function checkEmail() {
            return userService.checkEmail(vm.registerData.email.model);
        }

        function validation() {
            return checkEmail() && checkPassword() &&
                checkPasswordEqual() && checkUser();
        }

        function signIn() {
            if (!validation()) {
                $ionicPopup.alert({
                    title: 'MessageBox',
                    content: 'please fill in correct information'
                });
                return;
            }
        
        function registerCallback(data){
            if(data){
                $ionicPopup.alert({
                    title: 'ErrorMessage',
                    content: data.status + ', ' + data.message
                });
            }
            else{
                $state.go('app.home');
            }
        }

        authenticate.register(vm.registerData.username.model, 
            	              vm.registerData.password.model, 
                              vm.registerData.email.model,
                              registerCallback);
        }
}

})();