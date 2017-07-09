(function () {
    'use strict';

    angular
        .module('app.main.employee')
        .service('EmpAttendanceAPI', employeeAttenService);

    employeeAttenService.$inject = ['$q', '$http', 'Constant'];

    function employeeAttenService($q, $http, Constant) {
return {
            getAttendanceDetails: getAttendanceDetails,
            addAttendanceDetails: addAttendanceDetails,
            editAttendanceDetails: editAttendanceDetails,
           deleteAttendanceDetails: deleteAttendanceDetails,
            getPreviousData:getPreviousData,
            deleteallEmployeeAttendance:deleteallEmployeeAttendance
        };

        function getPreviousData(dd)
        {
         return $http({
                url:Constant.ATTENDANCE+'/api/getPreviousDayData/'+dd,
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


        function getAttendanceDetails() {
            return $http({
                url: Constant.ATTENDANCE + '/api/employees_attendance',
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

        function addAttendanceDetails(dataObj) {
            return $http({
                url: Constant.ATTENDANCE + '/api/employees_Attendance/add',
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

        function editAttendanceDetails(dataObj, id, wd) {
            return $http({
                url: Constant.ATTENDANCE + '/api/employees_Attendance/update/' + id + '/' + wd,
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

        function deleteAttendanceDetails(ID, WD) {
            return $http({
                url: Constant.ATTENDANCE + '/api/employees_Attendance/delete/' + ID + '/' + WD,
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
    
     function deleteallEmployeeAttendance() {
            return $http({
                url: Constant.ATTENDANCE + '/api/employees_Attendance/deleteall',
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
