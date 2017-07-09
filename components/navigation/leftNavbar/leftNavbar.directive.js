(function () {
    'use strict';

    angular.module('app.navigation.leftNavbar.directive', [
        'ui.router',
        'app.services.userDataService'
    ]);

    angular.module('app.navigation.leftNavbar.directive')
        .directive('leftNavbar', leftNavbar);

    leftNavbar.$inject = ['userDataService'];

    function leftNavbar(userDataService) {
        var directive = {
            restrict: 'E',
            templateUrl: 'components/navigation/leftNavbar/leftNavbar.html',
            link: link
        };

        return directive;

        function link($scope) {

            activate();

            function activate() {

            }

            function permission(name) {
                if (!$scope.permissions || !$scope.permissions.pop || !name) {
                    return false;
                }

                for (var i = 0; i < $scope.permissions.length; i++) {
                    if ($scope.permissions[i].permissionType === name) {
                        return true;
                    }
                }
            }
        }
    }
})();
