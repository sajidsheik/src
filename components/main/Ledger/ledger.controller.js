(function () {
    'use strict';

    angular
        .module('app.main.ledger')
        .controller('ledgerCtrl', ledgerCtrl);

    ledgerCtrl.$inject = ['$stateParams', 'ledgerAPI', 'Notify','$filter','$scope'];

    function ledgerCtrl($stateParams, ledgerAPI, Notify,$filter,$scope) {

        var vm = this;
        vm.ledger = {};
        vm.editledger = {};
        vm.addledger = addledger;
        vm.editledgerFn = editledgerFn;
        vm.deleteledger = deleteledger;
        vm.deleteall=deleteall;
        activate();


        function activate() {
            Notify.clean();

            ledgerAPI.getledgerDetails().then(function (resp) {
               vm.gridList = resp;
                $scope.totalItems = resp.length;
                $scope.currentPage = 1;
                $scope.itemsPerPage = 5;

                $scope.$watch("currentPage", function () {
                    setPagingData($scope.currentPage);
                });

                function setPagingData(page) {
                    var pagedData = resp.slice(
                        (page - 1) * $scope.itemsPerPage,
                        page * $scope.itemsPerPage
                    );
                    vm.gridList = pagedData;
                }
                angular.forEach(vm.gridList, function (item) {
                    if (item.Name == $stateParams.id) vm.currentledger = item;

                });
                vm.editledger = angular.copy(vm.currentledger);
                if(vm.editledger)
                {
                vm.editledger.Credit=parseInt( vm.editledger.Credit);
                vm.editledger.Debit=parseInt(vm.editledger.Debit);
                 var date=vm.editledger.Date;
                    var datepart=date.split('T');
                    vm.editledger.Date=datepart[0];
             vm.editledger.Date=new Date(vm.editledger.Date);
                }
                return vm.gridList;
            }).catch(function (error) {
                vm.showEle = true;
            });
        }

        function addledger() {

            ledgerAPI.addledgerDetails(vm.ledger)
                .then(function (resp) {
                    vm.hideForm = true;
                    vm.showButton = true;
                    Notify.green(resp);
                }).catch(function (error) {
                Notify.red(error);
            });
        }

        function deleteall() {
            ledgerAPI.deleteallledgersDetails()
                .then(function (resp) {
                    vm.hideForm = true;
                    vm.showButton = true;
                    Notify.clean();
                    Notify.green(resp);
                })
                .catch(function (error) {
                    Notify.clean();
                    Notify.red(error);
                });
        }

        function editledgerFn() {

            ledgerAPI.editledgerDetails(vm.editledger, vm.currentledger.Name,vm.currentledger.Date)
                .then(function (resp) {
                    vm.hideForm = true;
                    vm.showButton = true;
                    Notify.clean();
                    Notify.green(resp);
                })
                .catch(function (error) {
                    Notify.clean();
                    Notify.red(error);
                });
        }

        function deleteledger() {
            ledgerAPI.deleteledgerDetails(vm.currentledger.Name,vm.currentledger.Date)
                .then(function (resp) {
                    vm.hideForm = true;
                    vm.showButton = true;
                    Notify.clean();
                    Notify.green(resp);
                })
                .catch(function (error) {
                    Notify.clean();
                    Notify.red(error);
                });
        }
    }
})();
