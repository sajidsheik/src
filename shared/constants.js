(function () {
    'use strict';

    angular
        .module('app.constants', [])

        .service('Constant', constantService);

    constantService.$inject = ['$location'];

    function constantService($location) {
        var PROD_HOST_NAME = 'http://' + window.location.hostname + '/Employee-CRUD/src/slimapp/public';
        var DEV_HOST_KARTHIK = 'http://slimapp.dev';
        var DEV_HOST_NAME = 'http://' + window.location.hostname + '/Employee-CRUD/src/slimapp/public';
        var API = PROD_HOST_NAME;
        return {
            EMPLOYEE: API + '/employees.php',
            ATTENDANCE: API + '/empattendance.php',
            SALARY: API + '/empsal.php',
            PAYMENT: API + '/payment.php',
            PATIENT: API + '/patient.php',
            LEDGER: API + '/ledger.php',
            REPORT: API + '/report.php'
        }
    }
})();
