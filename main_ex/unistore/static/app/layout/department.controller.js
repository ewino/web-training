(function() {
    'use strict';

    angular
        .module('app.department', [])
        .controller('DepartmentController', DepartmentController);

    function DepartmentController($scope, $state, DepartmentService) {
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
            var params = $state.params;
            if (params['departmentId'] !== undefined) {
                deptVm.currentDept = +params['departmentId'];
            }
            refreshDepartment();
        };

        function refreshDepartment() {
            deptVm.deptName = '';
            var found = false;
            angular.forEach(deptVm.departments, function(dept) {
                if (dept.id === deptVm.currentDept) {
                    deptVm.deptName = dept.name;
                    found = true;
                    return false;
                }
            });

            if (found) {
                var departmentId = deptVm.currentDept;
                DepartmentService.getProducts(departmentId)
                    .then(function(resp) {
                        deptVm.products = resp.data;
                    })
                    .catch(function() {
                        console.error('Couldn\'t load products for department ' + departmentId);
                    });
            }
        }

        DepartmentService.getDepartments()
            .then(function(resp) {
                deptVm.departments = resp.data;
                if (deptVm.currentDept === null) {
                    deptVm.currentDept = deptVm.departments[0].id;
                }
                refreshDepartment();
            })
            .catch(function() {
                console.error('Couldn\'t load departments');
            });
    }
})();
