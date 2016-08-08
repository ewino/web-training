(function() {
    'use strict';

    angular
        .module('app.department', [])
        .controller('DepartmentController', DepartmentController);

    function DepartmentController($scope, $stateParams, DepartmentService) {
        var deptVm = this;

        // variables.
        deptVm.departments = [];
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

        DepartmentService.getDepartments()
            .then(function(resp) {
                deptVm.departments = resp.data;
            })
            .catch(function() {
                console.error('Couldn\'t load departments');
            })
    }
})();
