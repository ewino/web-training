(function() {
    'use strict';

    angular
        .module('app.filters')
        .filter('productAmount', productAmountFilter);

    function productAmountFilter($filter) {
        var numberFilter = $filter('number');

        return function filter (amount) {
            return amount ? numberFilter(amount) : 'Out of stock!'
        };
    }
})();
