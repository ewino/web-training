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

        function getProduct(productId) {
            return $http.get('/api/products/' + productId)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    $log.error('XHR failed for getProduct. ' + error.data);
                });
        }

        function buyProduct(productId, amount) {
            return $http.post('/api/products/' + productId + '/buy', {
                amount: amount
            })
            .catch(function (error) {
                $log.error('XHR failed for buyProduct. ' + error.data);
            });
        }
    }
})();
