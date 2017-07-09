(function() {
    'use strict';

    angular.module('app.navigation.$httpUnauthorized', []);

    angular.module('app.navigation.$httpUnauthorized').factory('myHttpInterceptor', myHttpInterceptor);
    angular.module('app.navigation.$httpUnauthorized').config(config);

    myHttpInterceptor.$inject = ['$rootScope', '$q', '$log'];

    function myHttpInterceptor($rootScope, $q, $log) {
        return {
            responseError: function (response) {
                $log.debug('myHttpInterceptor', response);
                if (response.status === 401 || response.status === 403) {
                    $rootScope.$emit('$authorizationFail', {
                        message: response.message || response.data || response.body || response
                    });
                }

                return $q.reject(response);
            }
        };
    }

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
        $httpProvider.interceptors.unshift('myHttpInterceptor');
    }
})();
