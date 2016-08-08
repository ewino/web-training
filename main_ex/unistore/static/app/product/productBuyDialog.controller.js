(function() {
  'use strict';

  angular
    .module('app.product')
    .controller('productBuyDialogController', ProductBuyDialogController);

  function ProductBuyDialogController($mdDialog, product, productService) {
      var productBuyDialogVm = this;

      productBuyDialogVm.product = product;
      productBuyDialogVm.color= null;
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
          return productService.buyProduct(productBuyDialogVm.product.id, productBuyDialogVm.amount);
      }

  }

})();
