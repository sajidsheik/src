(function () {
    'use strict';

    angular.module('app.auth', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('signIn', {
                url: '/signIn/signin',
                templateUrl: 'components/signIn/signIn.html',
                controller: 'signInCtrl',
                'unauthorized-state': true
            });
    }
})();

