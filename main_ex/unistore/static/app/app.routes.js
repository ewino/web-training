(function () {
    'use strict';

    angular
        .module('app')
        .run(appRun);

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/');
    }

    function getStates() {
        return [
            {
                state: 'main',
                config: {
                    url: '/',
                    templateUrl: '/static/build/layout/department.html',
                    controller: 'DepartmentController as deptVm'
                }
            },
            {
                state: 'main.department',
                config: {
                    url: 'departments/{departmentId:\\d+}',
                    templateUrl: '/static/build/layout/department.html',
                    controller: 'DepartmentController as deptVm'
                }
            },
            {
                state: 'product',
                config: {
                    url: '/products/{productId:\\d+}',
                    templateUrl: '/static/build/product/product.html',
                    controller: 'ProductController as prodVm'
                }
            }
        ];
    }

})();
