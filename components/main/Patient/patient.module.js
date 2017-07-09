(function () {
    'use strict';

    angular
        .module('app.main.patient', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('patient', {
                url: "/patient",
                template: '<div ui-view></div>'
            })
            .state('patient.list', {
                url: "/list-patient",
                templateUrl: 'components/main/Patient/Patient/Patient.list.html',
                controller: 'patientCtrl',
                controllerAs: 'vm'
            })
            .state('patient.add', {
                url: "/add-patient",
                templateUrl: 'components/main/Patient/Patient/Patient.add.html',
                controller: 'patientCtrl',
                controllerAs: 'vm'
            })
            .state('patient.edit', {
                url: "/edit-patient/:id/:wd",
                templateUrl: 'components/main/Patient/Patient/Patient.edit.html',
                controller: 'patientEditCtrl',
                controllerAs: 'vm'
            })
            .state('patient.delete', {
                url: "/delete-patient/:id/:wd",
                templateUrl: 'components/main/Patient/Patient/Patient.delete.html',
                controller: 'patientCtrl',
                controllerAs: 'vm'
            })
            .state('patient.all', {
                url: "/all-patient/:id",
                templateUrl: 'components/main/Patient/Patient/PatientAllData.html',
                controller: 'patientCtrl',
                controllerAs: 'vm'
            })
            .state('patient.deleteall', {
                url: "/delete-patient/all",
                templateUrl: 'components/main/Patient/Patient/Patient.delete.all.html',
                controller: 'patientCtrl',
                controllerAs: 'vm'
            })
            .state('payment', {
                url: "/payment",
                template: '<div ui-view></div>'
            })

            .state('payment.add', {
                url: "/add-payment",
                templateUrl: 'components/main/Patient/payment/Patientpay.add.html',
                controller: 'paymentCtrl',
                controllerAs: 'vm'
            })
             .state('payment.list', {
                url: "/list-payment",
                templateUrl: 'components/main/Patient/payment/Patientpay.list.html',
                controller: 'paymentCtrl',
                controllerAs: 'vm'
            })
            .state('payment.edit', {
                url: "/edit-payment/:id/:wd",
                templateUrl: 'components/main/Patient/payment/Patientpay.edit.html',
                controller: 'paymentCtrl',
                controllerAs: 'vm'
            })
            .state('payment.delete', {
                url: "/delete-payment/:id/:wd",
                templateUrl: 'components/main/Patient/payment/Patientpay.delete.html',
                controller: 'paymentCtrl',
                controllerAs: 'vm'
            })
             .state('payment.deleteall', {
                url: "/delete-payment/all",
                templateUrl: 'components/main/Patient/payment/Patientpay.delete.all.html',
                controller: 'paymentCtrl',
                controllerAs: 'vm'
            })

    }
})();
