(function() {
    'use strict';

    angular.module('app.navigation', [
        'app.navigation.stateChangeLog',
        'app.navigation.topNavbar',
        'app.navigation.leftNavbar',
        'app.navigation.authorizationRedirect',
        'app.navigation.$httpUnauthorized'
    ]);

})();
