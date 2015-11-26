(function(){
	angular.module('mobileApp')
		   .controller('JobCtrl', JobCtrl);

    JobCtrl.$inject = ['jobService', '$scope', '$cordovaInAppBrowser'];

	function JobCtrl(jobService, $scope, $cordovaInAppBrowser){
		var vm = this;

		var limit = 5;

		vm.locations = ['上海', '北京', '广州', '深圳'];
		vm.query = '';
		vm.selectedLocation = '上海';
		vm.jobs = [];

		vm.setLocation = function(location){
			if(vm.selectedLocation !== location){
				vm.selectedLocation = location;
				if(vm.query === ''){
					vm.jobs = [];
				}
				else{
					vm.searchJobs();
				}
			}
		};

		vm.searchJobs = function(){
			jobService.getJobs(vm.query, vm.selectedLocation, 0, limit)
					  .then(function(data){
					  	 vm.jobs = data;
					  });
		};

		vm.refreshJobs = function(){
			
			jobService.getJobs(vm.query, vm.selectedLocation, vm.jobs.length / limit, limit)
					  .then(function(data){
					  		vm.jobs = data;
					  })
					  .finally(function(){
					  	   $scope.$broadcast('scroll.refreshComplete');
					  });
		};

		vm.showJobDetails = function(url){
			var options = {
				location: 'yes',
				clearcache: 'yes',
				toolbar: 'no'
			};
			
			$cordovaInAppBrowser.open(url, '_blank', options);
		};
	}

})();