(function() {
    'use strict';

    angular.module('mobileApp').controller('RSSFeedCtrl', RSSFeedCtrl);

    RSSFeedCtrl.$inject = ['$stateParams', '$scope', 'rssService', 'formatService', 'loadingService', '$cordovaInAppBrowser'];

    function RSSFeedCtrl($stateParams, $scope, rssService, formatService, loadingService, $cordovaInAppBrowser) {
        var vm = this;

        vm.viewTitle = $stateParams.catelogTitle;
        vm.rssFeeds = angular.copy(preProcessFeedList(rssService.getLocalFeedList($stateParams.catelogId)));
        //initialFeed();

        /*vm.showContent = function(url){
			var options = {
			location: 'yes',
			clearcache: 'yes',
			toolbar: 'no'
			};
			$cordovaInAppBrowser.open(url, '_blank', options);
		};*/

        vm.refreshFeeds = function() {
            var limit = 5;
            rssService.getFeedsByCatelogId($stateParams.catelogId, vm.rssFeeds.length / limit, limit)
                .then(function(data) {
                        vm.rssFeeds = angular.copy(preProcessFeedList(data));
                    },
                    function(err) {}
                )
                .finally(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };


        function preProcessFeedList(data) {
        	
            return	_.chain(data)
	                .map(function(n) {
	                    n.title = formatService.cuttingString(n.title, 50);
	                    n.thumbPic = n.images.length > 0 ? n.images[0] : '/img/noPictrue.jpg';
	                    n.updated = formatService.formatDate(n.updated);
	                    return n;
	                })
	                .value();
        }
    }

})();