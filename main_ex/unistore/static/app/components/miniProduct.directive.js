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
            templateUrl: '/static/build/components/miniProduct.html',
            link: function(scope) {
                scope.imageUrl = '/static/images/favicon.png';
            }
        };
    }

})();
