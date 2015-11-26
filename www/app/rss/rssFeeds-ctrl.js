(function() {
    'use strict';

    angular.module('mobileApp').controller('RSSFeedCtrl', RSSFeedCtrl);

    RSSFeedCtrl.$inject = ['$state', '$scope', 'rssService'];

    function RSSFeedCtrl($state, $scope, rssService) {
        var vm = this;

        vm.viewTitle = $state.params.catelogTitle;
        vm.catelogId = $state.params.catelogId;

        vm.isLatesPostsUri = $state.is('app.posts');
        vm.page = 0;
        if(vm.isLatesPostsUri){
            vm.rssFeeds = angular.copy(rssService.preProcessFeedList(rssService.getLocalLatestPosts()));
        }
        else{

            vm.rssFeeds = angular.copy(rssService.preProcessFeedList(rssService.getLocalFeedList(vm.catelogId)));
            console.log(vm.rssFeeds);
        }
        
        vm.refreshFeeds = function() {
            var limit = 5;
            if(vm.isLatesPostsUri){
                rssService.getAllFeedsByDate(vm.page++, limit)
                    .then(function(data) {
                            vm.rssFeeds = angular.copy(rssService.preProcessFeedList(data));
                        },
                        function(err) {}
                    )
                    .finally(function() {
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            }
            else{
                rssService.getFeedsByCatelogId(vm.catelogId, vm.page++, limit)
                    .then(function(data) {
                            vm.rssFeeds = angular.copy(rssService.preProcessFeedList(data));
                        },
                        function(err) {}
                    )
                    .finally(function() {
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            }
        };

        vm.go2Details = function go2Details(title, id, link){
            var params = {title: title, id: id, link: link};

            if(vm.isLatesPostsUri){
                $state.go('app.post', params);
            }
            else{
                $state.go('app.feedDetails', params);
            }
        };
    }

})();