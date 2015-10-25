(function(){
	'use strict';

	angular.module('mobileApp').controller('FeedDetailsCtrl', FeedDetailsCtrl);

	FeedDetailsCtrl.$inject = ['$stateParams', 'rssService', '$sce'];
	
	function FeedDetailsCtrl($stateParams, rssService, $sce){
		var vm = this;
		
		var options = {
			location: 'yes',
			clearcache: 'yes',
			toolbar: 'no'
		};
		
		vm.title = $stateParams.title;
		//vm.feedId = $stateParams.id;
		console.log($stateParams);

	    rssService.getFeedCotentById($stateParams.id)
	    					   .then(function(content){
	    					   		vm.content = content;
	    					   		
	    					   		//var reg = new RegExp('^<img\s[^>]*?src\s*=\s*[\'\"]([^\'\"]*?)[\'\"][^>]*?>$', 'gi');
            						//return reg.test(vm.registerData.username.model);
	    					   		var reg =/<img\s[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/gi;

	    					   		while(reg.exec(vm.content )){
	    					   			console.log(RegExp.$1);
	    					   		}
	    					   		//reg.test(content);
	    					   		//console.log(RegExp.$1);
	    					   		//var images = reg.exec(vm.content );
        							//var images = content.match(reg);
        							//console.log(images);
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