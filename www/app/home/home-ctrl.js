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
				icon: 'ion-ios-home',
				text: 'Home',
			},{
				icon: 'ion-ios-home',
				text: 'Home',
			},{
				icon: 'ion-ios-home',
				text: 'Home',
			},{
				icon: 'ion-ios-home',
				text: 'Home',
			},{
				icon: 'ion-ios-home',
				text: 'Home',
			},
		];

		vm.isAuthenticated = authToken.isAuthenticate();
	}
})();