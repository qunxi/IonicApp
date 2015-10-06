(function(){
	'use strict';

	angular.module('mobileApp').controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['authToken'];

	function HomeCtrl(authToken){
		var vm = this;

		vm.slides = [
			{url: 'https://static.lufaxcdn.com/wcm-images/AsvSsCpe2Rnvo3RIgSksVg.jpg'},
			{url: 'https://static.lufaxcdn.com/wcm-images/FfONYVFctASceUHk7fvH1Q.jpg'},
			{url: 'https://static.lufaxcdn.com/wcm-images/bD6xN7sm4esJp9nqUw5N6w.jpg'}
		];

		vm.icons = [
			{
				icon: 'ion-social-apple',
				text: 'Apple',
				action: 'http://www.apple.com'
			},{
				icon: 'ion-social-android',
				text: 'Android',
				action: 'http://wwww.android.com'
			},{
				icon: 'ion-social-windows',
				text: 'Windows',
				action: 'http://www.microsoft.com'
			},{
				icon: 'ion-social-angular',
				text: 'Angular',
				action: 'http://www.angular.org'
			},{
				icon: 'ion-social-tux',
				text: 'Linux',
				action: 'http://www.linux.org'
			},{
				icon: 'ion-social-html5',
				text: 'Html5',
				action: 'http://www.w3cschool.com'
			},{
				icon: 'ion-social-skype',
				text: 'Skype',
				action: 'http://www.skype.com'
			},{
				icon: 'ion-social-github',
				text: 'Github',
				action: 'http://www.github.com'
			},{
				icon: 'ion-social-python',
				text: 'Python',
				action: ''
			}
		];

		vm.isAuthenticated = authToken.isAuthenticated();
		
		var user = authToken.getCurrentUser();

		if(user !== null){
			vm.username = user.username;
		}
	}
})();