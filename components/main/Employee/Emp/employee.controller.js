(function () {
    'use strict';

    angular
        .module('app.main.employee')
        .controller('EmployeeCtrl', EmployeeCtrl)
        .controller('EmployeeEditCtrl', EmployeeEditCtrl)
        .directive('customOnChange', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var onChangeHandler = scope.$eval(attrs.customOnChange);
                    element.bind('change', onChangeHandler);
                }
            };
        });

    EmployeeCtrl.$inject = ['$scope', '$stateParams', 'employeeAPI', 'Notify'];

    function EmployeeCtrl($scope, $stateParams, employeeAPI, Notify) {

        var vm = this;
        vm.employee = {};
        vm.addEmployee = addEmployee;
        vm.deleteEmployee = deleteEmployee;
        vm.deleteallEmployee=deleteallEmployee;
        vm.exportToPdf = exportToPdf;
        vm.employee.id_proof = '';
        vm.employee.photo = '';
        vm.employee.agreement = '';

        $scope.ID_PROOF = function (event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                $scope.$apply(function () {
                    vm.employee.id_proof = reader.result;
                });
            };
            reader.readAsDataURL(file);
        };

        $scope.PHOTO = function (event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                $scope.$apply(function () {
                    vm.employee.photo = reader.result;
                });
            };
            reader.readAsDataURL(file);
        };

        $scope.Agreement = function (event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                $scope.$apply(function () {
                    vm.employee.agreement = reader.result;
                });
            };
            reader.readAsDataURL(file);
        };

        activate();

        function activate() {
            Notify.clean();

            employeeAPI.getEmployeeDetails().then(function (resp) {
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
                    if (item.Employee_Id == $stateParams.id) vm.currentEmployee = item;
                });
                vm.editEmployee = angular.copy(vm.currentEmployee);
                return vm.gridList;
            }).catch(function (error) {
                vm.showEle = true;
            });
        }

        function addEmployee() {
            employeeAPI.addEmployeeDetails(vm.employee)
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


        function deleteEmployee() {
            employeeAPI.deleteEmployeeDetails(vm.currentEmployee.Employee_Id)
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
 function deleteallEmployee() {
            employeeAPI.deleteallEmployeeDetails()
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

        function exportToPdf() {
            kendo.drawing.drawDOM($("#formConfirmation")).then(function (group) {
                kendo.drawing.pdf.saveAs(group, "Employees.pdf");
            });
        }
    }

    EmployeeEditCtrl.$inject = ['$scope', '$stateParams', 'employeeAPI', 'Notify'];
    function EmployeeEditCtrl($scope, $stateParams, employeeAPI, Notify) {

        var vm = this;
        vm.editEmployee = {};
        vm.editEmployeeFn = editEmployeeFn;

        $scope.ID_PROOF = function (event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                $scope.$apply(function () {
                    vm.editEmployee.Id_Proof = reader.result;
                });
            };
            reader.readAsDataURL(file);
        };

        $scope.PHOTO = function (event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                $scope.$apply(function () {
                    vm.editEmployee.Employee_Photo = reader.result;
                });
            };
            reader.readAsDataURL(file);
        };

        $scope.Agreement = function (event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                $scope.$apply(function () {
                    vm.editEmployee.Agreement = reader.result;
                });
            };
            reader.readAsDataURL(file);
        };

        activate();

        function activate() {
            Notify.clean();

            employeeAPI.getEmployeeDetails().then(function (resp) {
                vm.gridList = resp;

                angular.forEach(vm.gridList, function (item) {
                    if (item.Employee_Id == $stateParams.id) vm.currentEmployee = item;
                });

                employeeAPI.getOneEmployeeDetails(vm.currentEmployee.Employee_Id).then(function (employee) {
                    vm.editEmployee = angular.copy(employee[0]);
                    var date=vm.editEmployee.Join_Date;
                       var datepart=date.split('T');
                       vm.editEmployee.Join_Date =datepart[0];
                    vm.editEmployee.Join_Date = new Date(vm.editEmployee.Join_Date);
                });
            }).catch(function (error) {
                vm.showEle = true;
            });
        }

        function editEmployeeFn() {
            employeeAPI.editEmployeeDetails(vm.editEmployee, vm.currentEmployee.Employee_Id)
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
