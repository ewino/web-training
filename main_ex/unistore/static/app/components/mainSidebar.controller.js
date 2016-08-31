(function() {
    'use strict';

    angular
        .module('app.components')
        .controller('MainSidebarController', MainSidebarController);

    function MainSidebarController(departmentService) {
        var mainSidebarVm = this;

        mainSidebarVm.departments = [];

        activate();

        function activate() {
            departmentService.getDepartments().then(function(response) {
                mainSidebarVm.departments = response.departments;
            });
        }

  }
})();
