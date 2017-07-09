(function() {
    'use strict';

    angular.module('app.main.dashboards.controller', [
        'ui.router',
        'app.services.userDataService'
    ]);

    angular.module('app.main.dashboards.controller').controller('DashboardsCtrl', DashboardsCtrl);

    DashboardsCtrl.$inject = ['$scope', '$state', 'userDataService'];

    function DashboardsCtrl(
        $scope,
        $state,
        userDataService
    ) {

    }
})();
