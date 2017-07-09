// jshint -W072
(function () {
    'use strict';

    angular.module('app.auth')
        .controller('signInCtrl', signInCtrl);

    signInCtrl.$inject = [
        '$scope', '$state', 'Notify', 'formError', 'authAPI', 'userDataService', '$location'
    ];

    function signInCtrl($scope, $state, Notify, formError, authAPI, userDataService, $location) {
        $scope.token = userDataService.getToken();
        $scope.user = {};

        $scope.signin = signin;

        function signin(form) {
            Notify.clean('signIn');

            if (!form.$invalid) {
                var sendObj = {
                    username: form.login.$viewValue || form.login.$modelValue,
                    password: form.password.$viewValue || form.password.$modelValue
                };
                localStorage['username'] = form.login.$viewValue || form.login.$modelValue;
                authAPI.signIn(sendObj)
                    .then(function (resp) {
                        userDataService.setToken(resp.data);
                        $state.go('dashboards');
                    }).catch(function (resp) {
                    userDataService.clear();
                    Notify.red('signIn', resp);
                });
            } else {
                formError.show(form.$error, 'signIn');
            }
        }
    }
})();
