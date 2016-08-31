(function() {
    'use strict';

    angular
        .module('app.department')
        .factory('departmentService', departmentService);

    function departmentService($http, $log) {

        return {
            getDepartments: getDepartments,
            getDepartment: getDepartment,
            getProducts: getProducts
        };

        function getDepartments() {
            return $http.get('/api/departments')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    $log.error('XHR failed for getDepartments. ' + error.data);
                });
        }

        function getDepartment(departmentId) {
            return $http.get('/api/departments/' + departmentId)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    $log.error('XHR failed for getDepartment. ' + error.data);
                });
        }


        function getProducts(departmentId) {
            return $http.get('/api/departments/' + departmentId + '/products')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    $log.error('XHR failed for getProducts. ' + error.data);
                });
        }

    }
})();
