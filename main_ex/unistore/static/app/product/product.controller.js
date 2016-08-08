(function() {
    'use strict';

    angular
        .module('app.product', [])
        .controller('productController', ProductController);

    function ProductController($scope, $stateParams, $mdDialog, productService) {
        var prodVm = this;

        prodVm.productId = null;
        prodVm.product = null;

        prodVm.loadFromState = loadFromState;
        prodVm.buyProduct = buyProduct;

        // When the state changes, the controller will be updated and a search will take place.
        $scope.$on('$stateChangeSuccess', function () {
            prodVm.loadFromState();
        });

        // Load local variables from the state (the URL of the page).
        function loadFromState() {
            prodVm.productId = $stateParams.productId;
            productService.getProduct(prodVm.productId)
                .then(function(response) {
                    prodVm.product = response;
                })
        }

        function buyProduct() {
            $mdDialog.show({
                templateUrl: '/static/build/product/productBuyDialog.html',
                controller: 'productBuyDialogController as productBuyDialogVm',
                clickOutsideToClose: true,
                locals: {
                    product: prodVm.product
                }
            }).then(function(amount) {
                if (amount) {
                    prodVm.product.amount -= amount;
                }
            });
        }

  }
})();
