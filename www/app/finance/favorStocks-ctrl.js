(function(){
	'use strict';
	
	angular.module('mobileApp').controller('FavorStockCtrl', FavorStockCtrl);

	FavorStockCtrl.$inject = ['$http', 'cacheManager'];

	function FavorStockCtrl($http, cachManager){
		var vm = this;
		
		vm.favorStocks = cachManager.getFavorStocksCache();
	}


	/*function StockCtrl($http, cacheManager){
		var vm = this;
		
		vm.getRss = function(){
			$http.get('http://martinfowler.com/feed.atom')
				.then(function sucess(res){
					console.log(res);
				}, function error(res){
					console.log(res);
				});
		};
		

		vm.favorStocks = function(){
			CacheFactory.get('');
		};




		function getReuslt(){



			for(var i = 0; i < 5; ++i){

				for(var j = 0; j < 5; ++j){

				}
			}
		}
		
	}*/
})();

