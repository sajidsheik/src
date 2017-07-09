(function () {
    'use strict';

    angular.module('app.navigation.topNavbar.directive', [
        'ui.router',
        'app.services.userDataService'
    ]);

    angular.module('app.navigation.topNavbar.directive').directive('topNavbar', topNavbar);

    topNavbar.$inject = ['$rootScope', '$location', '$window', 'userDataService', '$cookies'];

    function topNavbar($rootScope,
                       $location,
                       $window,
                       userDataService,
                       $cookies) {
        topNavbarCtrl.$inject = ['$scope', '$state'];

        var directive = {
            restrict: 'E',
            templateUrl: 'components/navigation/topNavbar/topNavbar.html',
            controller: topNavbarCtrl,
            link: link
        };

        return directive;

        function link($scope) {
            var host = $location.host();
        }

        function topNavbarCtrl($scope, $state) {
            $scope.signOut = signOut;

            function signOut() {
                userDataService.clear();
                $rootScope.authorized = false;
                $state.go('signIn');
            }
        }
    }
})();
