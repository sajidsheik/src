(function() {
    'use strict';

    angular.module('app.metisMenu', []);

    angular.module('app.metisMenu').directive('metisMenu', leftNavbar);

    leftNavbar.$inject = [];

    function leftNavbar() {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link($scope, elem) {
            var observer = new MutationObserver(createMetisMenu);
            observer.observe(elem[0], {childList: true, subtree: true});

            $scope.$on('$destroy', unbindAll);

            function unbindAll() {
                observer.disconnect();
            }

            function createMetisMenu() {
                elem.metisMenu();
            }
        }
    }
})();
