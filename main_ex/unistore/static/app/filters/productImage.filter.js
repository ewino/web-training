(function() {
    'use strict';

    angular
        .module('app.filters')
        .filter('productImage', productImageFilter);

    function productImageFilter() {
        return function filter (product) {
            return product ? '/static/images/' + product.id + '.png' : null;
        };
    }
})();
