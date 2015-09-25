(function(){
  'use strict';
  
  angular
    .module('custom-directive')
    .directive('iconGrid', [iconGrid]);
    
  function iconGrid(){
    
    return{
      restrict: 'E',
      templateUrl: 'custom/directive/iconGrid.html',
      scope:{
        cells: '=',
        colnum: '@'
      },
      controller: function($scope){

        var colNumber = parseInt($scope.colnum);

        $scope.getIconLines = function(){
            return _.trunk($scope.cells, colNumber);
        }
      }
    };
  }
})();