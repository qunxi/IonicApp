(function(){
	'use strict';

	angular.module('mobileApp')
		.controller('RegisterCtrl', RegisterCtrl);

	RegisterCtrl.$inject = ['authenticate'];

	function RegisterCtrl(){
		var vm = this;

		vm.tips = {
			user: '4-30 characters, include letter, digit, - and _. you can\'t change anymore if register successfully',
			password: '6-16 characters, include digit, letter(case sensitive), sign',
			againPassword: 'try it again',
			email: 'use legal eamil, you can change the password if you forget email'
		}

		vm.foucs = {
			user: false,
			password: false,
			againPassword: false,
			email: false
		}

		vm.errors = {

		}

		function checkUser(){
			var reg = new RegExp('^[a-zA-Z0-9-_]{4-30}$', 'g');
			return reg.test(vm.register.userName);
		}

		function checkPassword(){
			var reg = new RegExp('^[\w\W]{6, 15}$', 'g');
			return reg.test(vm.register.password);
		}

		function checkPasswordEqual(){
			return vm.register.password === vm.register.againPassword;
		}

		function checkEmail(){
			var reg = new RegExp('^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$',
								 'g');
			return reg.test(vm.register.email);
		}

		function validation(){
			return checkEmail() && checkPassword() 
				   && checkPasswordEqual() && checkUser();
		}
	}

})();
