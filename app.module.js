(function () {
    'use strict';


    angular.module('app', [
        'app.core',
        'app.auth',
        'app.main',
        'app.navigation',

        'app.services.userDataService',
        'app.service.notify',
        'app.constants'
    ])

        .config(config)
        .run(run);

    config.$inject = ['$urlRouterProvider', '$cookiesProvider', 'userDataServiceProvider', 'ConstantProvider'];

    function config($urlRouterProvider, $cookiesProvider, userDataServiceProvider, ConstantProvider) {
        redirect.$inject = ['$injector'];
        $urlRouterProvider.otherwise(redirect);

        function redirect($injector) {
            var $state = $injector.get('$state');
            $state.go('signIn');
        }
    }

    run.$inject = ['$rootScope', '$state'];

    function run($rootScope, $state) {
        $rootScope.$state = $state;
    }

})();
