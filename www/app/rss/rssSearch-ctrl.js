(function(){
	'use strict';

	angular.module('mobileApp').controller('RssSearchCtrl', RssSearchCtrl);

	angular.$inject = ['rssService', 'rssCache'];

	function RssSearchCtrl(rssService, rssCache){
		var vm = this;

		vm.queryText = '';

		vm.searchAutoComplete = function(){
			if(!vm.queryText.trim()){
				vm.searchResult = [];
				return;
			}

		    rssService.searchRssCatelog(vm.queryText)
		   			  .then(function(data){
		   			 		var result = markStateForSearchResult(data);
		   					vm.searchResult = angular.copy(result);
		    		   }, function(error){
		    				console.log(error);
		    		   });					 	
		};

		vm.addRssCatelog = function(catelog){
			if(catelog.checked)
				return;
			rssService.addRssCatelog(catelog._id)
					  .then(function(data){
					  	catelog.checked = true;
					  });
		};

		function markStateForSearchResult(searchResult){
			var localCatelogs = rssCache.getRssCatelogCache();

			return	_.map(searchResult, function(resultItem){
					var isFind = _.find(localCatelogs, function(localItem){
									return !!localItem && localItem._id === resultItem._id;
								});
					resultItem.checked = isFind ? true : false;
					return resultItem;
				});
		}
	}

})();