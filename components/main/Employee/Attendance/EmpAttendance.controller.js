(function () {
    'use strict';

    angular
        .module('app.main.employee')
        .controller('AttendanceCtrl', AttendanceCtrl);


    AttendanceCtrl.$inject = ['$stateParams', 'EmpAttendanceAPI', 'employeeAPI', 'Notify', '$filter', '$scope'];

    function AttendanceCtrl($stateParams, EmpAttendanceAPI, employeeAPI, Notify, $filter, $scope) {

        var vm = this;
        vm.employee = {};
        vm.editAttendance = {};
        vm.addAttendance = addAttendance;
        vm.editAttendanceFn = editAttendanceFn;
        vm.deleteAttendance = deleteAttendance;
         vm.deleteallEmployeeAttendance=deleteallEmployeeAttendance;
        activate();

        function activate() {
            Notify.clean();

            EmpAttendanceAPI.getAttendanceDetails().then(function (resp) {
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
                    if (item.Employee_Id == $stateParams.id && item.Working_Date == $stateParams.wd) vm.currentEmployee = item;

                });
                vm.editAttendance = angular.copy(vm.currentEmployee);
                if (vm.editAttendance) {
                    vm.editAttendance.Employee_Id = parseInt(vm.editAttendance.Employee_Id);
                    vm.editAttendance.Shift = parseInt(vm.editAttendance.Shift);
                    var date = vm.editAttendance.Working_Date;
                    var datepart = date.split('T');
                    vm.editAttendance.Working_Date = datepart[0];
                    vm.editAttendance.Working_Date = new Date(vm.editAttendance.Working_Date);


                    if (vm.editAttendance.Present == 1) {
                        vm.editAttendance.Present = true;
                    }
                    else {
                        vm.editAttendance.Present = false;
                    }

                }
                return vm.gridList;
            }).catch(function (error) {
                vm.showEle = true;
            });

            employeeAPI.getEmployeeDetails().then(function (resp) {
                vm.gridList1 = resp;

            });
        }


         function deleteallEmployeeAttendance() {
            EmpAttendanceAPI.deleteallEmployeeAttendance()
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

        $scope.update = function (item) {

            angular.forEach(vm.gridList1, function (value, key) {
                if (value.Employee_Name == item) {
                    var today = new Date();
                    var dd = today.getDate() - 1;
                    var mm = today.getMonth() + 1; //January is 0!
                    var yyyy = today.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd
                    }
                    if (mm < 10) {
                        mm = '0' + mm
                    }
                    var today1 = yyyy + "-" + mm + "-" + dd;
                    $scope.id = parseInt(value.Employee_Id);
                    vm.employee = null;
                    EmpAttendanceAPI.getPreviousData(today1).then(function (resp) {
                        vm.gridList2 = resp;
                        angular.forEach(vm.gridList2, function (item1) {
                            if ($scope.id == item1.Employee_Id) vm.employee = item1;

                        });
                        vm.employee.Shift = parseInt(vm.employee.Shift);
                        vm.employee.Patient_Name = vm.employee.Patients_Name;
                        vm.employee.Patient_Address = vm.employee.Patients_Address;
                        var date = vm.employee.Working_Date;
                        var datepart = date.split('T');
                        vm.employee.Working_Date = datepart[0];
                        vm.employee.Working_Date = new Date(vm.employee.Working_Date);
                        if (vm.employee.present == 1) {
                            vm.employee.present = true;
                        }
                        else {

                            vm.employee.present = false;
                        }
                    });
                }
            });
        };

        function addAttendance() {
            vm.employee.Employee_Id = $scope.id;
            var tick = vm.employee.present;
            vm.employee.Employee_Name = $scope.item;
 
            if (tick == 1) {
                vm.employee.present = 1;
            }
            else {
                vm.employee.present = 0;
            }
            EmpAttendanceAPI.addAttendanceDetails(vm.employee)
                .then(function (resp) {
                    vm.hideForm = true;
                    vm.showButton = true;
                    Notify.green(resp);
                }).catch(function (error) {
                Notify.red(error);
            });
        }

        function editAttendanceFn() {


            var tick = vm.editAttendance.Present;
            if (tick == 1) {
                vm.editAttendance.Present = 1;
            }
            else {
                vm.editAttendance.Present = 0;
            }
            EmpAttendanceAPI.editAttendanceDetails(vm.editAttendance, vm.currentEmployee.Employee_Id, vm.currentEmployee.Working_Date)
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

        function deleteAttendance() {
            EmpAttendanceAPI.deleteAttendanceDetails(vm.currentEmployee.Employee_Id, vm.currentEmployee.Working_Date)
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


