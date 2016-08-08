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
            // 'app.services', 'app.components'
            // Feature modules.
            'app.main'
        ])
        .run();

})();
