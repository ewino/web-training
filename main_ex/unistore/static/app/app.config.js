(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(http|https):/);
    }

})();
