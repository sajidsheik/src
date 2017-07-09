(function () {
    'use strict';

    angular
        .module('app.main.ledger', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('ledger', {
                url: "/ledger",
                template: '<div ui-view></div>'
            })
            .state('ledger.list', {
                url: "/list-ledger",
                templateUrl: 'components/main/Ledger/ledger.list.html',
                controller: 'ledgerCtrl',
                controllerAs: 'vm'
            })
            .state('ledger.add', {
                url: "/add-ledger",
                templateUrl: 'components/main/Ledger/ledger.add.html',
                controller: 'ledgerCtrl',
                controllerAs: 'vm'
            })
            .state('ledger.edit', {
                url: "/edit-ledger/:id/:wd",
                templateUrl: 'components/main/Ledger/ledger.edit.html',
                controller: 'ledgerCtrl',
                controllerAs: 'vm'
            })
            .state('ledger.delete', {
                url: "/delete-ledger/:id/:wd",
                templateUrl: 'components/main/Ledger/ledger.delete.html',
                controller: 'ledgerCtrl',
                controllerAs: 'vm'
            })
               .state('ledger.deleteall', {
                url: "/delete-ledger/all",
                templateUrl: 'components/main/Ledger/ledger.delete.all.html',
                controller: 'ledgerCtrl',
                controllerAs: 'vm'
            })
    }
})();
