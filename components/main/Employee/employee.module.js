(function () {
    'use strict';

    angular
        .module('app.main.employee', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('employee', {
                url: "/employee",
                template: '<div ui-view></div>'
            })
            .state('employee.list', {
                url: "/list-employee",
                templateUrl: 'components/main/Employee/Emp/employee.list.html',
                controller: 'EmployeeCtrl',
                controllerAs: 'vm'
            })
            .state('employee.all', {
                url: "/all-employee",
                templateUrl: 'components/main/Employee/Emp/employeeAllData.html',
                controller: 'EmployeeCtrl',
                controllerAs: 'vm'
            })
            .state('employee.add', {
                url: "/add-employee",
                templateUrl: 'components/main/Employee/Emp/employee.add.html',
                controller: 'EmployeeCtrl',
                controllerAs: 'vm'
            })
            .state('employee.view', {
                url: "/view-employee/:id",
                templateUrl: 'components/main/Employee/Emp/employee.view.html',
                controller: 'EmployeeEditCtrl',
                controllerAs: 'vm'
            })
            .state('employee.edit', {
                url: "/edit-employee/:id",
                templateUrl: 'components/main/Employee/Emp/employee.edit.html',
                controller: 'EmployeeEditCtrl',
                controllerAs: 'vm'
            })
            .state('employee.delete', {
                url: "/delete-employee/:id",
                templateUrl: 'components/main/Employee/Emp/employee.delete.html',
                controller: 'EmployeeCtrl',
                controllerAs: 'vm'
            })
               .state('employee.deleteall', {
                url: "/deleteall-employee/:id",
                templateUrl: 'components/main/Employee/Emp/employee.deleteall.html',
                controller: 'EmployeeCtrl',
                controllerAs: 'vm'
            })
            .state('salary', {
                url: "/salary",
                template: '<div ui-view></div>',

            })

            .state('salary.add', {
                url: "/add-salary",
                templateUrl: 'components/main/Employee/Salary/salary.add.html',
                controller: 'SalaryCtrl',
                controllerAs: 'vm'
            })
            .state('salary.list', {
                url: "/list-salary",
                templateUrl: 'components/main/Employee/Salary/salary.list.html',
                controller: 'SalaryCtrl',
                controllerAs: 'vm'
            })
            .state('salary.edit', {
                url: "/edit-salary/:id/:wd",
                templateUrl: 'components/main/Employee/Salary/salary.edit.html',
                controller: 'SalaryCtrl',
                controllerAs: 'vm'
            })
            .state('salary.delete', {
                url: "/delete-salary/:id/:wd",
                templateUrl: 'components/main/Employee/Salary/salary.delete.html',
                controller: 'SalaryCtrl',
                controllerAs: 'vm'

            })
             .state('salary.deleteall', {
                url: "/deleteall-employeesalary/",
                templateUrl: 'components/main/Employee/Salary/salary.deleteall.html',
                controller: 'SalaryCtrl',
                controllerAs: 'vm'
            })
            .state('empattendance', {
                url: "/empattendance",
                template: '<div ui-view></div>',

            })
            .state('empattendance.add', {
                url: "/add-attendance",
                templateUrl: 'components/main/Employee/Attendance/EmpAttendance.add.html',
                controller: 'AttendanceCtrl',
                controllerAs: 'vm'
            })
            .state('empattendance.list', {
                url: "/list-attendance",
                templateUrl: 'components/main/Employee/Attendance/EmpAttendance.list.html',
                controller: 'AttendanceCtrl',
                controllerAs: 'vm'
            })
            .state('empattendance.deleteall', {
                url: "/deleteall-employeeattendance/:id",
                templateUrl: 'components/main/Employee/Attendance/EmpAttendance.deleteall.html',
                controller: 'AttendanceCtrl',
                controllerAs: 'vm'
            })
            .state('empattendance.edit', {
                url: "/edit-attendance/:id/:wd",
                templateUrl: 'components/main/Employee/Attendance/EmpAttendance.edit.html',
                controller: 'AttendanceCtrl',
                controllerAs: 'vm'
            })
            .state('empattendance.delete', {
                url: "/delete-empattendance/:id/:wd",
                templateUrl: 'components/main/Employee/Attendance/EmpAttendance.delete.html',
                controller: 'AttendanceCtrl',
                controllerAs: 'vm'


            })
    }
})();
