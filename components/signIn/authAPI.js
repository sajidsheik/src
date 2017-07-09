(function () {
    'use strict';

    angular.module('app.auth')
        .factory('authAPI', authAPI);

    authAPI.$inject = ['$q', '$http', 'userDataService', 'Constant'];

    function authAPI($q, $http, userDataService, Constant) {
        var factory = {
            signIn: signIn
        };

        return factory;

        function signIn(params) {
            return $http({
                url: Constant.EMPLOYEE + '/api/user',
                method: 'POST',
                params: {
                    username: params.username,
                    password: params.password
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function (response) {
                var res = response.data;
                if (res.fail === 0) {
                    return $q.reject(response);
                } else {
                    return $q.resolve(response);
                }
            }).catch(function (error) {
                switch (error.data.status) {
                    default:
                        error.data = 'Invalid Username or Password!';
                        break;
                }
                return $q.reject(error.data);
            });
        }
    }
})();
