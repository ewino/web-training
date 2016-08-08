(function() {
    'use strict';

    angular
        .module('app.department', [])
        .controller('DepartmentController', DepartmentController);

    function DepartmentController() {
        var deptVm = this;

        // variables.
        deptVm.departments = [
            {id: 1, name: 'Shirts'},
            {id: 2, name: 'Pants'},
            {id: 3, name: 'Hats'},
            {id: 4, name: 'Belts'}
        ];

        // functions
    }

})();
