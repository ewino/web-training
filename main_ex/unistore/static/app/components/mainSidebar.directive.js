(function() {
    'use strict';

    angular
        .module('app.components')
        .directive('mainSidebar', mainSidebar);

    function mainSidebar() {
        return {
            restrict: 'E',
            scope: {
                currentDept: '='
            },
            templateUrl: '/static/build/components/mainSidebar.html'
        };
    }

})();
