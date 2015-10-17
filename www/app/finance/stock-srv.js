(function(){
	'use strict';
	
	angular
		.module('mobileApp')
		.factory('stockService', stockService);

	stockService.$inject = ['$http', 'API_URL', 'cacheManager'];

	function stockService($http, API_URL, cacheManager){
		var searchHistoriesData = cacheManager
									.getSearchHistoriesCache();
									
		var favorStocksData = cacheManager
									.getFavorStocksCache();	
		
		var service = {
			searchAutoComplete : searchAutoComplete,
			removeFavoriteHistory: removeFavoriteHistory,
			addFavoriteHistory: addFavoriteHistory,
			removeSearchHistoriesCache: removeSearchHistoriesCache
		};

		return service;


		function searchAutoComplete(query, callback){
			
			var url = API_URL + 'stocks/search?query=' + query;
			
			$http.get(url)
				.then(function success(res){
					callback(searchResultProcess(res.data));
				}, function error(res){
				    callback(searchResultProcess({
						status: res.status,
						message: res.error.message
					}));					
				});
		}

		
				
		function removeFavoriteHistory(stock){
			if(searchHistoriesData){
				updateSearchHistories(stock, function(data){
					data.checked = stock.checked;
				});
			}
			
			if(favorStocksData){
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

			var addStock = {
				code: stock.code,
				name: stock.name,
				checked: true
			};
			
			addFavorStock(addStock);

			updateSearchHistories(addStock, function(data){
				console.log('dd');
				data.checked = addStock.checked;
			});
		}

		function removeSearchHistoriesCache(){
			cacheManager.removeSearchHistoriesCache();

			searchHistoriesData = cacheManager.getSearchHistoriesCache();
			
		}

		//private

		function addFavorStock(stock){
			if(!favorStocksData){
				favorStocksData = [];
			}

		    var someOne = _.chain(favorStocksData)
			 			   .find(function(n){
			 			   		return n.code === stock.code;
			 				}).value();
			if(!someOne){
				favorStocksData.push(stock);
				cacheManager.updateFavorStocksCache(favorStocksData);
			}
		}

		function updateSearchHistories(stock, findCallback){
			var someOne = _.chain(searchHistoriesData)
						   .find(function(n){
							 	return n.code === stock.code;
						   }).value();
			if(!someOne){
				searchHistoriesData.push(stock);
				cacheManager.updateSearchHistoriesCache(searchHistoriesData);
			}
			else{

				findCallback(someOne);
				cacheManager.updateSearchHistoriesCache(searchHistoriesData);
			}
		}

		function searchResultProcess(data){
	
			var result = _.chain(data)
						  .map(function(item){
						 	return {
						 		code : Number(item.code.split('_')[0]),
						 		name : item.name,
						 		checked: false}; 
						 	})
						  .value();
			
			return filterHistoriesList(result);
		}

		function filterHistoriesList(result){
			
			if(searchHistoriesData){
				
				/*var tmp1 = result.concat(searchHistoriesData);
				var tmp = 
				 		   _.uniq(tmp1, 'code');
				 		   
				console.log(tmp);*/

				for(var i = 0; i < searchHistoriesData.length; ++i){
					
					for(var j = 0; j < result.length; ++j){
						if(result[j].code === 300316){
							console.log(result);
							console.log(searchHistoriesData);
						}

						if(result[j].code === searchHistoriesData[i].code){
							result.splice(j, 1);
							break;
						}
					}

				}
				
				return result.concat(searchHistoriesData);
			}
			else{
				console.log(result);
				return result;
			}
		}

	}

})();