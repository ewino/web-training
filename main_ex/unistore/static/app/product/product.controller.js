(function() {
    'use strict';

    angular
        .module('app.product', [])
        .controller('ProductController', ProductController);

    function ProductController($scope, productService) {
        var prodVm = this;

        prodVm.departmentId = null;
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
            prodVm.departmentId = $scope.$stateParams.departmentId;
            prodVm.productId = $scope.$stateParams.productId;
            prodVm.product = productService.getProduct(prodVm.departmentId, prodVm.productId);
        }

        function buyProduct(amount) {
            if (amount > 0 && amount <= prodVm.product.amount) {
                productService.buyProduct(prodVm.departmentId, prodVm.productId, amount);
                prodVm.product.amount -= amount;
            }
        }
  }
})();
