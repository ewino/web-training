(function() {
    'use strict';

    angular
        .module('app.product', ['app.department'])
        .controller('ProductController', ProductController);

    function ProductController($scope, $stateParams, $mdDialog, productService, departmentService) {
        var prodVm = this;

        prodVm.productId = null;
        prodVm.product = null;
        prodVm.similarProducts = [];
        prodVm.department = null;

        prodVm.loadFromState = loadFromState;
        prodVm.buyProduct = buyProduct;

        // When the state changes, the controller will be updated and a search will take place.
        $scope.$on('$stateChangeSuccess', function () {
            prodVm.loadFromState();
        });

        // Load local variables from the state (the URL of the page).
        function loadFromState() {
            prodVm.productId = $stateParams.productId;
            productService.getProduct(prodVm.productId).then(function(response) {
                prodVm.product = response;
                if (prodVm.product.similar_products) {
                    // Load similar products.
                    angular.forEach(prodVm.product.similar_products, function (similarProductId) {
                        productService.getProduct(similarProductId).then(function(response) {
                            prodVm.similarProducts.push(response);
                        });
                    });
                }
                // Load department details as well.
                departmentService.getDepartment(prodVm.product.department_id)
                    .then(function(response) {
                        prodVm.department = response;
                    });
            });
        }

        function buyProduct() {
            $mdDialog.show({
                templateUrl: '/static/build/product/productBuyDialog.html',
                controller: 'ProductBuyDialogController as productBuyDialogVm',
                clickOutsideToClose: true,
                locals: {
                    product: prodVm.product
                }
            }).then(function(amount) {
                if (angular.isDefined(amount)) {
                    prodVm.product.amount = amount;
                }
            });
        }
    }
})();
