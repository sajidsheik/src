(function () {
    'use strict';

    angular
        .module('app.main.patient')
        .service('patientAPI', patientService);

    patientService.$inject = ['$q', '$http', 'Constant'];

    function patientService($q, $http, Constant) {

        return {
            getpatientDetails: getpatientDetails,
            getOnepatientDetails: getOnepatientDetails,
            addpatientDetails: addpatientDetails,
            editpatientDetails: editpatientDetails,
            deletepatientDetails: deletepatientDetails,
            deleteallPatientDetails:deleteallPatientDetails
        };

        function getpatientDetails() {
            return $http({
                url: Constant.PATIENT + '/api/patients/all',
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

        function getOnepatientDetails(id,dd) {
            return $http({
                url: Constant.PATIENT + '/api/patient/'+id+'/'+dd,
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

        function addpatientDetails(dataObj) {
            return $http({
                url: Constant.PATIENT + '/api/patient/add',
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

        function editpatientDetails(dataObj, id, sd) {
            return $http({
                url: Constant.PATIENT + '/api/patient/update/' + id + '/' + sd,
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

        function deletepatientDetails(ID, SD) {
            return $http({
                url: Constant.PATIENT + '/api/patient/delete/' + ID + '/' + SD,
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

         function deleteallPatientDetails() {
            return $http({
                url: Constant.PATIENT + '/api/patient/deleteall',
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
