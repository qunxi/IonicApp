(function(){
	'use strict';

	angular.module('custom-directive')
		.directive('validateInput', validateInput);

	function validateInput(){
		return {
			restrict: "E",
			link: function(scope, element, attr){

			}
		}
	}

	




})();