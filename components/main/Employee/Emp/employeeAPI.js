(function () {
    'use strict';

    angular
        .module('app.main.employee')
        .service('employeeAPI', employeeService);

    employeeService.$inject = ['$q', '$http', 'Constant'];

    function employeeService($q, $http, Constant) {

        return {
            addEmployeeDetails: addEmployeeDetails,
            getEmployeeDetails: getEmployeeDetails,
            getOneEmployeeDetails: getOneEmployeeDetails,
            editEmployeeDetails: editEmployeeDetails,
            getEmployee: getEmployee,
            deleteEmployeeDetails: deleteEmployeeDetails,
            deleteallEmployeeDetails:deleteallEmployeeDetails
        };

        function getEmployeeDetails() {
            return $http({
                url: Constant.EMPLOYEE + '/api/employees',
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

        function getOneEmployeeDetails(id) {
            return $http({
                url: Constant.EMPLOYEE + '/api/employees/all/' + id,
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

        function getEmployee(id) {
            return $http({
                url: Constant.EMPLOYEE + '/api/employee/' + id,
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

        function editEmployeeDetails(dataObj, id) {
            return $http({
                url: Constant.EMPLOYEE + '/api/employee/update/' + id,
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

        function addEmployeeDetails(dataObj) {
            return $http({
                url: Constant.EMPLOYEE + '/api/employee/add',
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

        function deleteEmployeeDetails(ID) {
            return $http({
                url: Constant.EMPLOYEE + '/api/employee/delete/' + ID,
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
        function deleteallEmployeeDetails() {
            return $http({
                url: Constant.EMPLOYEE + '/api/employee/deleteall',
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
