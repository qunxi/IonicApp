(function() {
    'use strict';

    angular
        .module('custom-directive')
        .directive('iconGrid', [iconGrid]);

    function iconGrid() {

        return {
            restrict: 'E',
            templateUrl: 'custom/directive/iconGrid.html',
            scope: {
                cells: '=',
                colnum: '@'
            },
            controller: function($scope) {

                var colNumber = Number($scope.colnum);

                var iconLines = function alignIconCell() {
                    var extraInsert = colNumber - $scope.cells.length % colNumber;

                    for (var i = 0; i < extraInsert; ++i) {
                        $scope.cells.push(i);
                    }

                    return _.chunk($scope.cells, colNumber);
                }();

                $scope.getIconLines = function() {
                    return iconLines;
                };
            }
        };
    }
})();