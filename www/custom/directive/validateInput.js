(function() {
    'use strict';

    angular.module('custom-directive')
        .directive('validateInput', validateInput);

    function validateInput() {
        return {
            restrict: 'E',
            templateUrl: 'custom/directive/validateInput.html',
            scope: {
                validateData: '=',
                checkHandle: '&'
            },
            link: function(scope, element, attrs) {

                var input = element.find('input');
                input.on('focus', function(evt) {

                    element.find('span').remove();

                    if (scope.validateData.tip) {
                        input.parent().after('<span class="tip">' + scope.validateData.tip + '</span>');
                    }
                });

                input.on('blur', function(evt) {
                    element.find('span').remove();
                    //console.log(scope.checkHandle());
                    if (!scope.checkHandle()) {
                        input.parent().after('<span class="error">' + scope.validateData.error + '</span>');
                    }
                });
            }
        };
    }
})();