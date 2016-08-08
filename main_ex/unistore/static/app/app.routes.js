(function () {
    'use strict';

    angular
        .module('app')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/');
    }

    function getStates() {
        return [
            {
                state: 'main',
                config: {
                    url: '/',
                    templateUrl: '/static/build/layout/main.html',
                    controller: 'MainController as mainVm'
                }
            }
        ];
    }

})();
