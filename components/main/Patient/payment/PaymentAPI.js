(function () {
    'use strict';

    angular
        .module('app.main.patient')
        .service('paymentAPI', paymentService);

    paymentService.$inject = ['$q', '$http', 'Constant'];

    function paymentService($q, $http, Constant) {

        return {
            getpaymentDetails: getpaymentDetails,
            addpaymentDetails: addpaymentDetails,
            editpaymentDetails: editpaymentDetails,
            deletepaymentDetails: deletepaymentDetails,
            deleteallPatientPayDetails:deleteallPatientPayDetails
        };

        function getpaymentDetails() {
            return $http({
                url: Constant.PAYMENT + '/api/payments',
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

        function addpaymentDetails(dataObj) {
            return $http({
                url: Constant.PAYMENT + '/api/payment/add',
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

        function editpaymentDetails(dataObj, id, pd) {
            return $http({
                url: Constant.PAYMENT + '/api/payment/update/'+ id+ '/' + pd,
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

        function deletepaymentDetails(ID, SD) {
            return $http({
                url: Constant.PAYMENT + '/api/payment/delete/' + ID + '/' + SD,
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

         function deleteallPatientPayDetails() {
            return $http({
                url: Constant.PAYMENT + '/api/payment/deleteall',
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
