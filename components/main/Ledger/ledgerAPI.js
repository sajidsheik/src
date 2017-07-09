(function () {
    'use strict';

    angular
        .module('app.main.ledger')
        .service('ledgerAPI', ledgerService);

    ledgerService.$inject = ['$q', '$http', 'Constant'];

    function ledgerService($q, $http, Constant) {

        return {
            getledgerDetails: getledgerDetails,
            addledgerDetails: addledgerDetails,
            editledgerDetails: editledgerDetails,
            deleteledgerDetails: deleteledgerDetails,
            deleteallledgersDetails:deleteallledgersDetails
        };

        function deleteallledgersDetails() {
            return $http({
                url: Constant.LEDGER + '/api/ledger/deleteall',
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
        
        function getledgerDetails() {
            return $http({
                url: Constant.LEDGER + '/api/ledger',
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

        function addledgerDetails(dataObj) {
            return $http({
                url: Constant.LEDGER + '/api/ledger/add',
                method: 'POST',
                data: dataObj
            }).then(function (response) {
                console.log(response);
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

        function editledgerDetails(dataObj, id, sd) {
            return $http({
                url: Constant.LEDGER + '/api/ledger/update/' + id + '/' + sd,
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

        function deleteledgerDetails(ID, SD) {
            return $http({
                url: Constant.LEDGER + '/api/ledger/delete/' + ID + '/' + SD,
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
