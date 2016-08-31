(function() {
    'use strict';

    angular
        .module('app.components')
        .directive('mainHeader', mainHeader);

    function mainHeader() {
        return {
            restrict: 'E',
            scope: {
                text: '=',
                showIcon: '='
            },
            templateUrl: '/static/build/components/mainHeader.html'
        };
    }

})();
