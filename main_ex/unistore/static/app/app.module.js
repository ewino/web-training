(function() {
    'use strict';

    angular
        .module('app', [
            // Angular libraries.
            'ngAnimate', 'ngSanitize', 'ngMessages', 'ngAria',
            // External libraries.
            'ui.router', 'ngMaterial',
            // Basic app blocks.
            'blocks.router',
            // Services & Components.
            'app.components', 'app.filters',
            // Feature modules.
            'app.department', 'app.product'
        ]);

})();
