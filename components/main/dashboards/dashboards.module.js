(function () {
    'use strict';

    angular.module('app.main.dashboards', [
        'app.main.dashboards.controller'
    ])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('dashboards', {
                url: "/list-attendance",
                templateUrl: 'components/main/Employee/Attendance/EmpAttendance.list.html',
                controller: 'AttendanceCtrl',
                controllerAs: 'vm',
                data: {
                    requireLogin: true // this property will apply to all children of 'app'
                }
            });
    }
})();
