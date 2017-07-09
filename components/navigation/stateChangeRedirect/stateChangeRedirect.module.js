(function () {
    'use strict';

    angular.module('app')
        .run(run);

    run.$inject = ['$rootScope', '$state', 'userDataService'];

    function run($rootScope, $state, userDataService) {
        $rootScope.$on('$stateChangeError', function(event, toS, toP, fromS, fromP, config) {

            if ($rootScope.authorizationFail) {
                var message = $rootScope.authorizationFail;

                event.preventDefault();
                $rootScope.authorizationFail = null;
                $rootScope.authorized = false;
                userDataService.clear();
                $state.go('signIn', {errorMessage: message});
            } else if (config === 'already authorized!') {
                event.preventDefault();
                $rootScope.authorized = true;
                $state.go('dashboards');
            }
        });
    }
})();