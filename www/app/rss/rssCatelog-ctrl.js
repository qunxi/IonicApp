(function(){
	'use strict';

	angular.module('mobileApp').controller('RSSCatelogCtrl', RSSCatelogCtrl);

	RSSCatelogCtrl.$inject = ['rssService', '$scope', 'authToken', 
							  '$ionicPopup', '$state', 'loadingService'];

	function RSSCatelogCtrl(rssService, $scope, authToken, $ionicPopup, $state, loadingService){
		var vm = this;
		
		vm.rssCatelogs = rssService.getLocalCatelogs();
		vm.removeMode = false;
		vm.removeItemList = [];
		
		vm.isAuthenticated = authToken.isAuthenticated();
		
		if(!vm.isAuthenticated){
			$state.go('app.login');
		}

		vm.subscrible = function(address){
			loadingService.show();

			rssService.subscrible(address)
					.then(function(data){
						  vm.rssCatelogs = angular.copy(data);
						  console.log(vm.rssCatelogs);
						  loadingService.hide();
						  $state.go('app.rss');
						},
						function(error){
							console.log(error);
							loadingService.hide();
					});
		};

		
		vm.switchRemoveMode = function(){
			vm.removeMode = true;
			vm.removeItemList = [];
		};

		vm.cancelRemoveMode = function(){
			vm.removeMode = false;
			vm.removeItemList = [];
		};


		vm.refreshCatelogs = function() {
			if(!authToken.getToken()){
				$scope.$broadcast('scroll.refreshComplete');
				return;
			}
			var limit = 5;
            rssService.getCatelogs(authToken.getToken(), vm.rssCatelogs.length / limit, limit )
                .then(function(data) {
                        vm.rssCatelogs = angular.copy(data);
                    },
                    function(err) {}
                )
                .finally(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };

		vm.removeSelectedCatelog = function(){
			var popupConfirm = $ionicPopup.confirm({
				title: 'MessageBox',
				template: 'Are you sure you want to remove the catelogs which you selected'
			});

			popupConfirm.then(function(res){
				if(res){
					if(vm.removeItemList.length){
						rssService.removeCatelogs(vm.removeItemList)
						  .then(function(data){
						  		
						  		if(data || data.length){
						  			vm.removeMode = false;
						  		}
						  	 	vm.rssCatelogs = data;
						  }, function(error){
						  	 console.log(error);
						  });
					}
				}
			});
			

		};



		vm.selectRemoveItem = function(catelogId){
			var isExist = _.some(vm.removeItemList, catelogId);

			 if(isExist){
			 	vm.removeItemList = 
			 			_.chain(vm.removeItemList)
			 			 .remove(function(n){
			 				return n === catelogId;
			 			 }).value();
			 }
			 else{
			 	vm.removeItemList.push(catelogId);
			 }
		};

	}

})();