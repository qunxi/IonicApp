(function(){
	'use strict';

	angular.module('mobileApp').controller('SearchCtrl', SearchCtrl);

	SearchCtrl.$inject = ['stockService', 'CacheFactory'];

	function SearchCtrl(stockService, CacheFactory){
		var vm = this;

		vm.stockName = '';
		vm.searchResult = [];

		vm.searchAutoComplete = function(){
		 	
		    stockService.searchAutoComplete(vm.stockName, searchCallback);					 	
		};

		vm.setFavorite = function(stock){
			stock.checked = !stock.checked;
			if(stock.checked){
				addFavoriteHistory(stock);
			}
			else{
				removeFavoriteHistory(stock);
			}
		};

		//implement 
		var favorHistoryCacheId = 'favorHistoryCache';
		var favorHistoryDataKey = 'faoverHistoryData';
		var favorHistoryData;	
		var favorHistoryCache; 
		
		function getFavorHistoryCache(){
			
			if(favorHistoryCache){
				return favorHistoryCache;
			}

			if(!CacheFactory.get(favorHistoryCacheId)){
				CacheFactory.createCache(favorHistoryCacheId, {
						storageMode: 'localStorage',
						deleteOnExpire: 'aggressive',
        				recycleFreq: 60000
        		});
			}

			favorHistoryCache = CacheFactory.get(favorHistoryCacheId);

			return favorHistoryCache;
		}

		function getFavoriteHistory(){
			if(!favorHistoryData){
				favorHistoryData = getFavorHistoryCache().get(favorHistoryDataKey);
			}
			return favorHistoryData;
		}

		function removeFavoriteHistory(stock){

			if(getFavoriteHistory()){

				favorHistoryData =
						_.chain(favorHistoryData)
				 		 .remove(function(n){
							 return n.code === stock.code;
						  })
				 		 .value();

				getFavorHistoryCache().put(favorHistoryDataKey, favorHistoryData);
			}
		}

		function addFavoriteHistory(stock){

			if(!getFavoriteHistory()){
				favorHistoryData = [];
			}
			
			favorHistoryData.push({
				'code': stock.code,
				'name': stock.name,
				'checked': true
			});

			getFavorHistoryCache().put(favorHistoryDataKey, favorHistoryData);
		}


		function searchCallback(data){
	
			var result = _.chain(data)
						  .map(function(item){
						 	return {
						 		'code' : Number(item.code.split('_')[0]),
						 		'name' : item.name,
						 		'checked': false}; 
						 	})
						  .value();

			filterFavorList(result);
		}

		function filterFavorList(result){
			
			if(getFavoriteHistory()){
				
				for(var i = 0; i < result.length; ++i){
					var isDuplicate = false;
					for(var j = 0; j < favorHistoryData.length; ++j){
						if(result[i].code === favorHistoryData[j].code){
							isDuplicate = true;
						}
					}

					if(isDuplicate === true){
						result.splice(i, 1);
						console.log('find', result);
					}
				}

				vm.searchResult = result.concat(favorHistoryData);
			}
			else{
				vm.searchResult = result;
			}
		}
	}
})();