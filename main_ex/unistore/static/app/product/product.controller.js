(function() {
    'use strict';

    angular
        .module('app.product', [])
        .controller('ProductController', ProductController);

    function ProductController($scope, $stateParams, productService) {
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

        function buyProduct(amount) {
            if (amount > 0 && amount <= prodVm.product.amount) {
                productService.buyProduct(prodVm.productId, amount)
                    .then(function() {
                        prodVm.product.amount -= amount;
                    });
            }
        }
  }
})();
