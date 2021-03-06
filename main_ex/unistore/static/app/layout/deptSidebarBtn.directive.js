(function() {
    'use strict';

    angular
        .module('app.department')
        .directive('departmentButton', departmentButton);

    function departmentButton() {
        return {
            restrict: 'E',
            scope: {
                dept: '=',
                isActive: '='
            },
            templateUrl: '/static/build/layout/deptSidebarBtn.html'
        };
    }

})();
