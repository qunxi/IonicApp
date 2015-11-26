(function(){
	'use strict';

	angular.module('mobileApp').controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['authToken', 'homeService', '$cordovaInAppBrowser', 'rssService'];

	function HomeCtrl(authToken, homeService, $cordovaInAppBrowser, rssService){
		var vm = this;

		vm.slides = [
			{url: 'https://static.lufaxcdn.com/wcm-images/AsvSsCpe2Rnvo3RIgSksVg.jpg'},
			{url: 'https://static.lufaxcdn.com/wcm-images/FfONYVFctASceUHk7fvH1Q.jpg'},
			{url: 'https://static.lufaxcdn.com/wcm-images/bD6xN7sm4esJp9nqUw5N6w.jpg'}
		];

		vm.icons = getIconGrid();

		vm.isAuthenticated = authToken.isAuthenticated();
		
		var user = authToken.getCurrentUserInfo();

		if(user){
			vm.username = user.username;
		}

		vm.latestJobs = homeService.getLocalHotJobs();
		
		vm.latestPosts = getTop5LocalLatestPosts();
		
		getLatestPosts();
		getLatestJobs();


		vm.showJobDetails = function(url){
			var options = {
				location: 'yes',
				clearcache: 'yes',
				toolbar: 'no'
			};
			$cordovaInAppBrowser.open(url, '_blank', options);
		};

		function getLatestPosts(){
			rssService.getAllFeedsByDate(0, 5)
			           .then(function(data){
			           		
			           		vm.latestPosts = getTop5LocalLatestPosts();
			           });
		}

		function getLatestJobs(){
			homeService.getLatestJobs()
			           .then(function(data){
			           		vm.latestJobs = data;
			           });
		}

		function getTop5LocalLatestPosts(){
			var posts = rssService.getLocalLatestPosts();
			
			return rssService.preProcessFeedList(_.take(posts, 5));
		}

		function getIconGrid(){
			return  [
				{
					icon: 'ion-social-apple',
					text: 'Apple',
					action: 'http://www.apple.com'
				},{
					icon: 'ion-social-android',
					text: 'Android',
					action: 'http://wwww.android.com'
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
		}

	}
})();