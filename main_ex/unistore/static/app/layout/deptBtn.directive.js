(function() {
    'use strict';

    angular
        .module('app.main')
        .directive('departmentButton', departmentButton);

    function departmentButton() {
        return {
            scope: {
                deptId: '=',
                name: '='
            },
            templateUrl: '/static/build/layout/deptBtn.html',
            link: function(scope, el) {

            }
        };
    }

})();
