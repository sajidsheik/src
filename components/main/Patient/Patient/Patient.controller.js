(function () {
    'use strict';

    angular
        .module('app.main.patient')
        .controller('patientCtrl', patientCtrl)
        .controller('patientEditCtrl', patientEditCtrl);


    patientCtrl.$inject = ['$scope', '$stateParams', 'patientAPI', 'Notify', 'Constant'];

    function patientCtrl($scope, $stateParams, patientAPI, Notify, Constant) {

        var vm = this;
        vm.patient = {};
        vm.addpatient = addpatient;
        vm.deletepatient = deletepatient;
         vm.deleteallPatientDetails = deleteallPatientDetails;
        
        vm.patient.id_proof = '';
        vm.patient.agreement = '';
         vm.exportToPdf = exportToPdf;

        $scope.ID_PROOF = function (event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                $scope.$apply(function () {
                    vm.patient.id_proof = reader.result;
                });
            };
            reader.readAsDataURL(file);
        };

        function deleteallPatientDetails() {
            patientAPI.deleteallPatientDetails()
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

        $scope.Agreement = function (event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                $scope.$apply(function () {
                    vm.patient.agreement = reader.result;
                });
            };
            reader.readAsDataURL(file);
        };

 function exportToPdf() {
            kendo.drawing.drawDOM($("#formConfirmation")).then(function (group) {
                kendo.drawing.pdf.saveAs(group, "Patients.pdf");
            });
        }

        activate();

        function activate() {
            Notify.clean();

            patientAPI.getpatientDetails().then(function (resp) {
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
                        var date2=item.Service_Date;
                    var datepart2=date2.split('T');
                    item.Service_Date=datepart2[0];
                     var date3=item.Due_Date;
                    var datepart3=date3.split('T');
                    item.Due_Date=datepart3[0];
                });
                angular.forEach(vm.gridList, function (item) {
                    if (item.Patient_Id == $stateParams.id && item.Service_Date==$stateParams.wd) vm.currentpatient = item;
                });
                vm.editpatient = angular.copy(vm.currentpatient);
                if (vm.editpatient) {

                    vm.editpatient.Patient_Id = parseInt(vm.editpatient.Patient_Id);
                    vm.editpatient.Contact_Number = parseInt(vm.editpatient.Contact_Number);
                    vm.editpatient.Service_Date = new Date(vm.editpatient.Service_Date);
                    vm.editpatient.Due_Date = new Date(vm.editpatient.Due_Date);

                }
                return vm.gridList;
            }).catch(function (error) {
                vm.showEle = true;
            });
        }

        function addpatient() {
            patientAPI.addpatientDetails(vm.patient)
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

        function deletepatient() {
            patientAPI.deletepatientDetails(vm.currentpatient.Patient_Id, vm.currentpatient.Service_Date)
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

    patientEditCtrl.$inject = ['$scope', '$stateParams', 'patientAPI', 'Notify', 'Constant'];

    function patientEditCtrl($scope, $stateParams, patientAPI, Notify, Constant) {

        var vm = this;
        vm.editpatient = {};
        vm.editPatientFn = editPatientFn;
        vm.editpatient.Id_Proof = '';
        vm.editpatient.Agreement = '';

        $scope.ID_PROOF = function (event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                $scope.$apply(function () {
                    vm.editpatient.Id_Proof = reader.result;
                });
            };
            reader.readAsDataURL(file);
        };

        $scope.Agreement = function (event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                $scope.$apply(function () {
                    vm.editpatient.Agreement = reader.result;
                });
            };
            reader.readAsDataURL(file);
        };


        activate();

        function activate() {
            Notify.clean();

            patientAPI.getpatientDetails().then(function (resp) {
                vm.gridList = resp;

                angular.forEach(vm.gridList, function (item) {
                    if (item.Patient_Id == $stateParams.id) vm.currentpatient = item;
                });
                console.log(vm.currentpatient);

                patientAPI.getOnepatientDetails(vm.currentpatient.Patient_Id,vm.currentpatient.Service_Date).then(function (patient) {
                    vm.editpatient = angular.copy(patient);
                    if (vm.editpatient) {

                        vm.editpatient.Patient_Id = parseInt(vm.editpatient.Patient_Id);
                        vm.editpatient.Contact_Number = parseInt(vm.editpatient.Contact_Number);
                           var date=vm.editpatient.Service_Date;
                       var datepart=date.split('T');
                       vm.editpatient.Service_Date=datepart[0];
                       var date1=vm.editpatient.Due_Date;
                       var datepart1=date1.split('T');
                       vm.editpatient.Due_Date=datepart1[0];
                        vm.editpatient.Service_Date = new Date(vm.editpatient.Service_Date);
                        vm.editpatient.Due_Date = new Date(vm.editpatient.Due_Date);

                    }
                });
            }).catch(function (error) {
                vm.showEle = true;
            });
        }

        function editPatientFn() {
            patientAPI.editpatientDetails(vm.editpatient, vm.currentpatient.Patient_Id, vm.currentpatient.Service_Date)
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
