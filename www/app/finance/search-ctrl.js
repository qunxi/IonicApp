(function(){
	angular.module('mobileApp').controller('SearchCtrl', SearchCtrl);

	SearchCtrl.$inject = ['stockService'];

	function SearchCtrl(stockService){
		var vm = this;

		vm.stockName = '';
		vm.searchResult = [];

		vm.searchAutoComplete = function(){
		 	
		    stockService.searchAutoComplete(vm.stockName, searchCallback);					 	
		};

		vm.setFavorite = function(stock){
			stock.checked = !stock.checked;
		};

		function searchCallback(data){
			vm.searchResult = 
						_.chain(data)
						 .map(function(item){
						 	return {
						 		code : item.code.split('_')[0],
						 		name : item.name,
						 		checked: false
						 	};
						 }).value();
		}
	}
})();