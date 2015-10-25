(function(){
	angular.module('mobileApp').factory('formatService', formatService);

	function formatService(){
		var service = {
			cuttingString: cuttingString,
			formatDate: formatDate,
			extractImage: extractImage
		};
		return service;

		function formatDate(date){
			var newDate = new Date();

			if(!(date instanceof Date)){
				var parseDate = Date.parse(date);
				if(!!parseDate){
					newDate = new Date(parseDate);
				}
			}else{
				newDate = date;
			}
			
			return newDate.getUTCFullYear() + '-' +
			       newDate.getUTCMonth() + '-' + newDate.getUTCDate() +
				   ' ' + newDate.getUTCHours() + ':' + newDate.getUTCMinutes() + 
				   ':' + newDate.getUTCSeconds();
		}

		function cuttingString(data, maxLength){
			if(data.length > maxLength){
				return data.substr(0, maxLength) + '...';
			}
			return data;
		}

		function extractImage(htmlStream){
			var container = document.createElement('div');
    		container.innerHTML = htmlStream;
    		var imageTag = angular.element(container).find('img');
    		var imagSrcs = imageTag.prop('src');
    		//console.log(imageTags);
    		/*var imagSrcs =  _.chain(imageTags)
				    	    .map(function(n){
				    		 	return n.prop('src');
				    		 }).value();*/

			//console.log(imagSrcs);
			/*if(imagSrcs.length > 1){
				return imagSrcs[1];
			}
			else if(imagSrcs.length === 1){
				return imagSrcs[0];
			}*/
			return imagSrcs;
    		//return null;
		}

	}

})();