(function() {
    'use strict';

    angular
        .module('app.department', [])
        .controller('DepartmentController', DepartmentController);

    function DepartmentController($scope) {
        var deptVm = this;

        // variables.
        // TODO: remove this
        deptVm.departments = [
            {id: 1, name: 'Shirts'},
            {id: 2, name: 'Pants'},
            {id: 3, name: 'Hats'},
            {id: 4, name: 'Belts'}
        ];

        deptVm.currentDept = null;
        deptVm.deptName = null;

        // functions
        $scope.$on('$stateChangeSuccess', function () {
            deptVm.loadState();
        });

        deptVm.loadState = function() {
            deptVm.currentDept = 1;
            deptVm.deptName = '';
            angular.forEach(deptVm.departments, function(dept) {
                if (dept.id === deptVm.currentDept) {
                    deptVm.deptName = dept.name;
                }
            });
        };
    }
})();
