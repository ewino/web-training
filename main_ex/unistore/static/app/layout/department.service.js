(function() {
    'use strict';

    angular
        .module('app.department')
        .factory('DepartmentService', DepartmentService);

    function DepartmentService($http) {
        var service = {};

        service.getDepartments = function() {
            return $http.get('/api/departments');
        };

        service.getProducts = function(departmentId) {
            return $http.get('/api/departments/' + departmentId + '/products');
        };

        return service;
    }
})();
