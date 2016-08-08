(function() {
    'use strict';

    angular
        .module('app.main', [])
        .controller('MainController', MainController);

    function MainController() {
        var mainVm = this;

        // variables.
        mainVm.departments = [
            {id: 1, name: 'Shirts'},
            {id: 2, name: 'Pants'},
            {id: 3, name: 'Hats'},
            {id: 4, name: 'Belts'}
        ];

        // functions
    }

})();
