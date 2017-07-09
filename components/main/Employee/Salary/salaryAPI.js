(function () {
    'use strict';

    angular
        .module('app.main.employee')
        .service('salaryAPI', employeesalService);

    employeesalService.$inject = ['$q', '$http', 'Constant'];

    function employeesalService($q, $http, Constant) {

        return {
            getSalaryDetails: getSalaryDetails,
            addSalaryDetails: addSalaryDetails,
            editSalaryDetails: editSalaryDetails,
            deleteSalaryDetails: deleteSalaryDetails,
             deleteallEmpSalaryDetails:deleteallEmpSalaryDetails
        };

        function getSalaryDetails() {
            return $http({
                url: Constant.SALARY + '/api/employees_salary',
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

        function addSalaryDetails(dataObj) {
            return $http({
                url: Constant.SALARY + '/api/employeesal/add',
                method: 'POST',
                data: dataObj
            }).then(function (response) {
                return $q.resolve(response.data);
            }).catch(function (error) {
                switch (error.data.status) {
                    default:
                        error.data = 'Server error. Please, try later';
                        break;
                }
                return $q.reject(error.data);
            });
        }

        function editSalaryDetails(dataObj, id, sd) {
            return $http({
                url: Constant.SALARY + '/api/employeesal/update/' + id + '/' + sd,
                method: 'PUT',
                data: dataObj
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

        function deleteSalaryDetails(ID, SD) {
            return $http({
                url: Constant.SALARY + '/api/employeesal/delete/' + ID + '/' + SD,
                method: 'DELETE'
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
        function deleteallEmpSalaryDetails() {
            return $http({
                url: Constant.SALARY + '/api/employeesal/deleteall',
                method: 'DELETE'
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
    }

})();
