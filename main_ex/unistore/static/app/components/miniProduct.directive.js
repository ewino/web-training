(function() {
    'use strict';

    angular
        .module('app.components')
        .directive('miniProduct', miniProduct);

    function miniProduct() {
        return {
            scope: {
                product: '='
            },
            templateUrl: '/static/build/components/miniProduct.html'
        };
    }

})();
