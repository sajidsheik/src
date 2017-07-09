(function () {
    'use strict';

    angular
        .module('app.main.employee')
        .controller('SalaryCtrl', SalaryCtrl);

    SalaryCtrl.$inject = ['$stateParams', 'salaryAPI', 'employeeAPI', 'Notify', '$filter', '$scope'];

    function SalaryCtrl($stateParams, salaryAPI, employeeAPI, Notify, $filter, $scope) {

        var vm = this;
        vm.employee = {};
        vm.editSalary = {};
        vm.addSalary = addSalary;
        vm.editSalaryFn = editSalaryFn;
        vm.deleteSalary = deleteSalary;
        vm.deleteallEmployeesal=deleteallEmployeesal;
        activate();
    function deleteallEmployeesal() {
            salaryAPI.deleteallEmpSalaryDetails()
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

        
        function activate() {
            Notify.clean();

            salaryAPI.getSalaryDetails().then(function (resp) {
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
                        var date2=item.Salary_Date;
                    var datepart2=date2.split('T');
                    item.Salary_Date=datepart2[0];
                });
                angular.forEach(vm.gridList, function (item) {
                    if (item.Employee_Id == $stateParams.id && item.Salary_Date==$stateParams.wd) vm.currentEmployee = item;
                });
                vm.editSalary = angular.copy(vm.currentEmployee);
                if (vm.editSalary) {
                    vm.editSalary.Employee_Id = parseInt(vm.editSalary.Employee_Id);
                    vm.editSalary.Emp_Salary = parseInt(vm.editSalary.Emp_Salary);
                    vm.editSalary.Bank_Account_No = parseInt(vm.editSalary.Bank_Account_No);
                    vm.editSalary.PostofficeAccountNumber = parseInt(vm.editSalary.PostofficeAccountNumber);
                    vm.editSalary.AllowancesorAdvance = parseInt(vm.editSalary.AllowancesorAdvance);
                     var date=vm.editSalary.Salary_Date;
                    var datepart=date.split('T');
                    vm.editSalary.Salary_Date=datepart[0];

                    vm.editSalary.Salary_Date = new Date(vm.editSalary.Salary_Date);
                    if (vm.editSalary.PostofficeAccountorRD == 1) {
                        vm.editSalary.PostofficeAccountorRD = true;
                    }
                    else {
                        vm.editSalary.PostofficeAccountorRD = false;
                    }
                }


                return vm.gridList;
            }).catch(function (error) {
                vm.showEle = true;
            });
        }

        activate2();

        function activate2() {
            employeeAPI.getEmployeeDetails().then(function (resp) {
                vm.gridList1 = resp;

            });
        }


        $scope.update = function (item) {

            angular.forEach(vm.gridList1, function (value, key) {

                if (value.Employee_Name == item) {
                    $scope.id = parseInt(value.Employee_Id)
                }
            });

        };

        function addSalary() {

            vm.employee.Employee_Id = $scope.id;
            var tick = vm.employee.postofficetick;
            if (tick == 1) {
                vm.employee.postofficetick = 1;
            }
            else {
                vm.employee.postofficetick = 0;
            }
            salaryAPI.addSalaryDetails(vm.employee)
                .then(function (resp) {
                    vm.hideForm = true;
                    vm.showButton = true;
                    Notify.green(resp);
                }).catch(function (error) {
                Notify.red(error);
            });
        }

        function editSalaryFn() {
            salaryAPI.editSalaryDetails(vm.editSalary, vm.currentEmployee.Employee_Id, vm.currentEmployee.Salary_Date)
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

        function deleteSalary() {
            salaryAPI.deleteSalaryDetails(vm.currentEmployee.Employee_Id, vm.currentEmployee.Salary_Date)
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
