(function () {
    'use strict';

    angular.module('app.navigation.authorizationRedirect', [
        'ui.router',
        'app.services.userDataService'
    ]);

    angular.module('app.navigation.authorizationRedirect').run(run);

    run.$inject = ['$rootScope', '$state', '$log', 'userDataService', 'authAPI'];

    function run($rootScope, $state, $log, userDataService, authAPI) {
        var authChecked = false;

        $rootScope.$on('$stateChangeStart', checkAuthorization);
        $rootScope.$on('$authorizationFail', logOut);
        $rootScope.$on('$authorizationConfirm', continueWork);
        $rootScope.$on('$stateChangeSuccess', addAuthCheck);

        function logOut(event, params) {
            $rootScope.authorized = false;
            userDataService.clear();
            authChecked = true;
            $state.go('signIn');
        }

        function addAuthCheck() {
            authChecked = false;
        }

        function continueWork(event, params) {
            $rootScope.authorized = true;
            authChecked = true;
            $state.go(params.toState);
        }

        function checkAuthorization(event, toState) {
            var token = userDataService.getToken(),
                toUnauthorized = toState['unauthorized-state'];

            if (authChecked) {
                return;
            }

            if (toUnauthorized) {
                if ($rootScope.authorized && token) { // stop redirection
                    event.preventDefault();
                }
                if (token) { // check is authorized
                    event.preventDefault();
                    // authAPI.getUser(sucGetUser, onError);
                    $rootScope.$emit('$authorizationConfirm', {toState: (toUnauthorized) ? 'dashboards' : toState.name});
                } // else do nothing
            } else {
                if (!$rootScope.authorized && token) { // check is not authorized
                    // event.preventDefault();
                    // authAPI.getUser(sucGetUser, onError);
                    var username = localStorage['username'];
                    $rootScope.$emit('$authorizationConfirm', {toState: (toUnauthorized) ? 'dashboards' : toState.name});

                } else if (!$rootScope.authorized && (!token)) { // authorization fail - redirect to sign in
                    event.preventDefault();
                    $rootScope.$emit('$authorizationFail', {message: 'You are not authorized'});
                } // else do nothing
            }

            function sucGetUser(resp) {
                userDataService.setUser(resp.data.data[0]);
            }

            function onError(resp) {
                if (resp.status !== 401 && resp.status !== 403) {

                } // else $authorizationFail event will emit from $http.unauthorized.config.js (same folder)
                logOut();
            }
        }
    }
})();
