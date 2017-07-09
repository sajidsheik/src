(function () {
    'use strict';

    angular
        .module('app.main.report')
        .service('reportAPI', employeeService);

    employeeService.$inject = ['$q', '$http', 'Constant'];

    function employeeService($q, $http, Constant) {

        return {
            getEmpAttendance: getEmpAttendance,
            getEmployeesal: getEmployeesal,
            getPatients: getPatients,
            getPayments: getPayments,
            getLedgers:getLedgers,
            totemp:totemp,
            totpat:totpat
        };

        function getEmpAttendance(month) {
            return $http({
               url: Constant.REPORT + '/api/reports/attendance/'+month,
                method: 'GET'
            }).then(function (response) {
                return $q.when(response.data);
            }).catch(function (error) {
                switch (error.data.status) {
                    default:
                        error.data = 'Server error. Please, try later';
                        break;
                }
                return $q.reject(error.data);
            });
        }

        function getEmployeesal(month) {
            return $http({
                 url: Constant.REPORT + '/api/reports/salary/'+month,
                method: 'GET'
            }).then(function (response) {
                return $q.when(response.data);
            }).catch(function (error) {
                switch (error.data.status) {
                    default:
                        error.data = 'Server error. Please, try later';
                        break;
                }
                return $q.reject(error.data);
            });
        }

        function getPatients(month) {
            return $http({
                url: Constant.REPORT + '/api/reports/patients/'+month,
                method: 'GET'
            }).then(function (response) {
                return $q.when(response.data);
            }).catch(function (error) {
                switch (error.data.status) {
                    default:
                        error.data = 'Server error. Please, try later';
                        break;
                }
                return $q.reject(error.data);
            });
        }

        function getPayments(month) {
            return $http({
                url: Constant.REPORT + '/api/reports/payments/'+month,
                method: 'GET',
            }).then(function (response) {
                return $q.resolve(response.data);
            }).catch(function (error) {
                switch (error.data) {
                    default:
                        error.data = 'Server error. Please, try later';
                        break;
                }
                return $q.reject(error.data);
            });
        }

       function getLedgers(month) {
            return $http({
                url: Constant.REPORT + '/api/reports/ledgers/'+month,
                method: 'GET',
            }).then(function (response) {
                return $q.resolve(response.data);
            }).catch(function (error) {
                switch (error.data) {
                    default:
                        error.data = 'Server error. Please, try later';
                        break;
                }
                return $q.reject(error.data);
            });
        }
     function totemp() {
            return $http({
                url: Constant.REPORT + '/api/reports/totemp',
                method: 'GET',
            }).then(function (response) {
                return $q.resolve(response.data);
            }).catch(function (error) {
                switch (error.data) {
                    default:
                        error.data = 'Server error. Please, try later';
                        break;
                }
                return $q.reject(error.data);
            });
        }
             function totpat() {
            return $http({
                url: Constant.REPORT + '/api/reports/totpat',
                method: 'GET',
            }).then(function (response) {
                return $q.resolve(response.data);
            }).catch(function (error) {
                switch (error.data) {
                    default:
                        error.data = 'Server error. Please, try later';
                        break;
                }
                return $q.reject(error.data);
            });
        }
        
    }

})();
