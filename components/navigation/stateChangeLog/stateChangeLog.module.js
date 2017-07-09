(function () {
    'use strict';

    angular
        .module('app.navigation.stateChangeLog', [])
        .run(run);

    run.$inject = ['$rootScope'];

    function run($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from) {
            $rootScope.previousState = (from) ? from.name : undefined;
            $rootScope.currentState = (to) ? to.name : undefined;
        });
    }
})();
