(function () {
    'use strict';

    angular
        .module('app.main.report', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('reports', {
                url: "/report",
                template: '<div ui-view></div>'
            })
           
               .state('reports.list', {
                url: "/reports",
                templateUrl: 'components/main/Reports/Reports.html',
                controller: 'reportCtrl',
                controllerAs: 'vm'
            })
    }
})();
