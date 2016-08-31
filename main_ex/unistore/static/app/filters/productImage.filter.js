(function() {
    'use strict';

    angular
        .module('app.filters')
        .filter('productImage', ProductImageFilter);

    function ProductImageFilter() {
        return function filter (product) {
            return '/static/images/' + product.id + '.png';
        };
    }
})();
