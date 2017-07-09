'use strict';

angular.module('app.services.userDataService', []);

angular.module('app.services.userDataService')
    .factory('userDataService', ['$cookies', function ($cookies) {

        function setToken(value) {
            localStorage['schoolappToken'] = value;
        }

        function setUser(value) {
            localStorage['user'] = JSON.stringify(value);
        }

        function getToken() {
            return localStorage['schoolappToken'];
        }

        function getUser() {
            var user = localStorage['user'];
            return (user) ? JSON.parse(user) : user;
        }

        function clear() {
            localStorage.removeItem('schoolappToken');
            localStorage.removeItem('user');
            localStorage.removeItem('username');
        }

        return {
            setToken: setToken,
            setUser: setUser,
            getToken: getToken,
            getUser: getUser,
            clear: clear
        };
    }]);