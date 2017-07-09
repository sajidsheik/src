(function () {
    'use strict';

    angular
        .module('app.main.patient')
        .controller('paymentCtrl', paymentCtrl);


    paymentCtrl.$inject = ['$stateParams', 'patientAPI', 'paymentAPI', 'Notify', '$filter', '$scope'];

    function paymentCtrl($stateParams, patientAPI, paymentAPI, Notify, $filter, $scope) {

        var vm = this;
        vm.payment = {};
        vm.editpayment = {};
        vm.addpayment = addpayment;
        vm.editpaymentFn = editpaymentFn;
        vm.deletepayment = deletepayment;
        vm.deleteallPatientpayDetails=deleteallPatientpayDetails;
        vm.payment.Patient_Name = '';
        activate();

        function activate() {
            Notify.clean();

            paymentAPI.getpaymentDetails().then(function (resp) {
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
                angular.forEach(vm.gridList,function(item){
                        var date2=item.Payment_Date;
                    var datepart2=date2.split('T');
                    item.Payment_Date=datepart2[0];
                });
                angular.forEach(vm.gridList, function (item) {
                    if (item.Patient_Id == $stateParams.id && item.Payment_Date==$stateParams.wd) vm.currentpayment = item;
                });
                vm.editpayment = angular.copy(vm.currentpayment);
                if (vm.editpayment) {

                    vm.editpayment.Patient_Id = parseInt(vm.editpayment.Patient_Id);

                    vm.editpayment.Amount = parseInt(vm.editpayment.Amount);
                    vm.editpayment.Patient_Account = parseInt(vm.editpayment.Patient_Account);
                    vm.editpayment.Payment_Date = new Date(vm.editpayment.Payment_Date);
                }
                return vm.gridList;
            }).catch(function (error) {
                vm.showEle = true;
            });
        }

        activate2();

        function activate2() {
            patientAPI.getpatientDetails().then(function (resp) {
                vm.gridList1 = resp;

            });
        }


        $scope.update = function (item) {

            angular.forEach(vm.gridList1, function (value, key) {

                if (value.Patient_Name == item) {
                    $scope.id = parseInt(value.Patient_Id);
                    vm.payment.Patient_Name = value.Patient_Name;
                }
            });

        };
         function deleteallPatientpayDetails() {
            paymentAPI.deleteallPatientPayDetails()
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

        function addpayment() {
            vm.payment.Patient_Id = $scope.id;
            paymentAPI.addpaymentDetails(vm.payment)
                .then(function (resp) {
                    vm.hideForm = true;
                    vm.showButton = true;
                    Notify.green(resp);
                }).catch(function (error) {
                Notify.red(error);
            });
        }

        function editpaymentFn() {


            paymentAPI.editpaymentDetails(vm.editpayment, vm.currentpayment.Patient_Id, vm.currentpayment.Payment_Date)
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

        function deletepayment() {
            paymentAPI.deletepaymentDetails(vm.currentpayment.Patient_Id, vm.currentpayment.Payment_Date)
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

