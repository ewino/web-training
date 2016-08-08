(function () {
    'use strict';

    angular
        .module('app.product')
        .factory('productService', productService);

    function productService($http, $log) {

        return {
            getProduct: getProduct,
            buyProduct: buyProduct
        };

        function getProduct(departmentId, productId) {
            return $http.get('/api/departments/' + departmentId + '/products/' + productId)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    $log.error('XHR failed for getProduct. ' + error.data);
                });
        }

        function buyProduct(departmentId, productId, amount) {
            return $http.post('/api/departments/' + departmentId + '/products/' + productId + 'buy', {
                amount: amount
            })
            .catch(function (error) {
                $log.error('XHR failed for updateIOC. ' + error.data);
            });
        }
    }
})();
