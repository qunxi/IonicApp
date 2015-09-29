(function() {
    'use strict';

    angular.module('mobileApp')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['authenticate', '$ionicPopup', '$timeout'];

    function RegisterCtrl(authenticate, $ionicPopup, $timeout) {

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
            var reg = new RegExp('^[a-zA-Z0-9-_]{4,30}$', 'g');
            return reg.test(vm.registerData.username.model);
        }

        function checkPassword() {
            var reg = new RegExp('^[\\W\\w]{6,15}$', 'g');
            //console.log(vm.registerData.password.model);
            //console.log(reg.test(vm.registerData.password.model));
            return reg.test(vm.registerData.password.model);
        }

        function checkPasswordEqual() {
            return vm.registerData.passwordAgain.model &&
            	   vm.registerData.password.model === vm.registerData.passwordAgain.model;
        }

        function checkEmail() {
            var reg = new RegExp('^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$',
                'g');
            return reg.test(vm.registerData.email.model);
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
            
            authenticate.register(vm.registerData.username.model, 
            	vm.registerData.password.model, vm.registerData.email.model);
        }
    }

})();