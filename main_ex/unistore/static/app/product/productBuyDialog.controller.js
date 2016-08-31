(function() {
    'use strict';

    angular
        .module('app.product')
        .controller('ProductBuyDialogController', ProductBuyDialogController);

    function ProductBuyDialogController($mdDialog, $mdToast, product, productService) {
        var productBuyDialogVm = this;

        productBuyDialogVm.product = product;
        productBuyDialogVm.color = null;
        productBuyDialogVm.amount = null;
        productBuyDialogVm.colors = [
            {
                name: 'Green'
            },
            {
                name: 'Blue'
            }
        ];

        productBuyDialogVm.cancel = cancel;
        productBuyDialogVm.ok = ok;

        function cancel() {
            $mdDialog.hide();
        }

        function ok() {
            productService.buyProduct(productBuyDialogVm.product.id, productBuyDialogVm.amount)
                .then(function(response) {
                    $mdToast.showSimple('Bought ' + productBuyDialogVm.product.name + ' (' +
                        productBuyDialogVm.amount + ')');
                    $mdDialog.hide(response.data.amount);
                });
        }

    }

})();
