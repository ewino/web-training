(function() {
    'use strict';

    angular
        .module('app.department')
        .directive('departmentButton', departmentButton);

    function departmentButton() {
        return {
            scope: {
                deptId: '=',
                name: '='
            },
            templateUrl: '/static/build/layout/deptSidebarBtn.html'
        };
    }

})();
