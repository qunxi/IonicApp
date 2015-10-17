(function(){
	'use strict';

	angular.module('mobileApp').controller('SearchCtrl', SearchCtrl);

	SearchCtrl.$inject = ['stockService', 'cacheManager'];

	function SearchCtrl(stockService, cacheManager){
		var vm = this;

		vm.stockName = '';
		vm.searchResult = cacheManager.getSearchHistoriesCache();
		
		vm.searchAutoComplete = function(){
		   stockService.searchAutoComplete(vm.stockName, function(data){
		   		vm.searchResult = angular.copy(data);
		    });					 	
		};

		vm.setFavorite = function(stock){
			stock.checked = !stock.checked;
			
			if(stock.checked){
				stockService.addFavoriteHistory(stock);
			}
			else{
				stockService.removeFavoriteHistory(stock);
			}
		};

		vm.removeSearchedCache = function(){
			stockService.removeSearchHistoriesCache();
			vm.searchResult = stockService.getSearchHistoriesCache();
		};
		
		/*var searchHistoriesData = cacheManager
									.getSearchHistoriesCache();
									
		var favorStocksData = cacheManager
									.getFavorStocksCache();
		
				
		function removeFavoriteHistory(stock){
			if(searchHistoriesData){
					var item = _.chain(searchHistoriesData)
						 		.find(function(n){
						 			return n.code === stock.code;
						 		})
						 		.value();
					console.log(item);
					if(!!item){
						item.checked = false;
						cacheManager.updateSearchHistoriesCache(searchHistoriesData);	
					}
			}
			

			if(favorStocksData){

				favorStocksData =
						_.chain(favorStocksData)
				 		 .remove(function(n){
							 return n.code === stock.code;
						  })
				 		 .value();

				cacheManager.updateFavorStocksCache(favorStocksData);
			}
		}

		function addFavoriteHistory(stock){

			if(!searchHistoriesData){
				searchHistoriesData = [];
			}

			if(!favorStocksData){
				favorStocksData = [];
			}

			var addStock = {
				code: stock.code,
				name: stock.name,
				checked: true
			};
			
			favorStocksData.push(addStock);
			cacheManager.updateFavorStocksCache(favorStocksData);

		    var isExist = _.chain(searchHistoriesData)
						   .find(function(n){
							 	return n.code === stock.code;
						   }).value();
			if(!isExist){
				searchHistoriesData.push(addStock);
				cacheManager.updateSearchHistoriesCache(searchHistoriesData);
			}
		}


		function searchCallback(data){
	
			var result = _.chain(data)
						  .map(function(item){
						 	return {
						 		code : Number(item.code.split('_')[0]),
						 		name : item.name,
						 		checked: false}; 
						 	})
						  .value();
			
			filterHistoriesList(result);
		}

		function filterHistoriesList(result){
			
			if(searchHistoriesData){
				
				for(var i = 0; i < result.length; ++i){
					var isDuplicate = false;
					for(var j = 0; j < searchHistoriesData.length; ++j){
						if(result[i].code === searchHistoriesData[j].code){
							isDuplicate = true;
						}
					}

					if(isDuplicate === true){
						result.splice(i, 1);
						console.log('find', result);
					}
				}
				
				vm.searchResult = result.concat(searchHistoriesData);
			}
			else{
				vm.searchResult = result;
			}
		}*/
	}
})();