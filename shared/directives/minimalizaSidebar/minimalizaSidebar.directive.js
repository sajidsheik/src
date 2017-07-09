(function () {
    'use strict';

    angular.module('app.minimalizaSidebar', []);

    angular.module('app.minimalizaSidebar').directive('minimalizaSidebar', function () {

        minimalizaSidebarController.$inject = ['$scope', '$element'];
        
        return {
            restrict: 'A',
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()">' +
            '<i class="fa fa-bars"></i>' +
            '</a>',
            controller: minimalizaSidebarController
        };

        function minimalizaSidebarController($scope, $element) {
            $scope.minimalize = function () {
                angular.element("body").toggleClass("mini-navbar").toggleClass("open-navbar");
                if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    angular.element('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            angular.element('#side-menu').fadeIn(500);
                        }, 100);
                } else if (angular.element('body').hasClass('fixed-sidebar')) {
                    angular.element('#side-menu').hide();
                    setTimeout(
                        function () {
                            angular.element('#side-menu').fadeIn(500);
                        }, 300);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    angular.element('#side-menu').removeAttr('style');
                }
            }
        }
    });
})();



