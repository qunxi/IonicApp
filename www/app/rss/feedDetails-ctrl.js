(function(){
	'use strict';

	angular.module('mobileApp').controller('FeedDetailsCtrl', FeedDetailsCtrl);

	FeedDetailsCtrl.$inject = ['$stateParams', 'rssService', '$cordovaInAppBrowser', 'loadingService'];
	
	function FeedDetailsCtrl($stateParams, rssService, $cordovaInAppBrowser, loadingService){
		var vm = this;
		
		vm.title = $stateParams.title;
		vm.loadedSuccess = false;

		vm.go2origin = function(){
			var options = {
				location: 'no',
				clearcache: 'yes',
				toolbar: 'no'
			};
			
			$cordovaInAppBrowser.open($stateParams.link, '_blank', options);
		};

		loadingService.show();
	    rssService.getFeedCotentById($stateParams.id)
	    		  .then(function(content){
	    			    vm.content = content;
	    			    loadingService.hide();
	    			    vm.loadedSuccess = true;
	    		   });


		//$cordovaInAppBrowser.open('http://www.baidu.com', '_blank', options);
		//$cordovaInAppBrowser.open(vm.url, '_blank', options);
		 /*document.addEventListener(function () {
		    $cordovaInAppBrowser.open('http://www.baidu.com', '_blank', options)
		      .then(function(event) {
		      	console.log('ddd');
		        // success
		      })
		      .catch(function(event) {
		      	console.log(event);
		        // error
		      });


		    $cordovaInAppBrowser.close();

		  }, false);*/

	}

})();