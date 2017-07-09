(function () {
    'use strict';

    angular
        .module('app.service.notify.directive', [
            'app.service.notify.factory'
        ])
        .directive('notify', notifyDirective);

    notifyDirective.$inject = ['Notify'];

    function notifyDirective(Notify) {
        return {
            restrict: 'E',
            scope: {
                for: '@'
            },
            template: '' +
            '<div ng-repeat="notification in notifyObj" ' +
            '     ng-class="notification.class" ' +
            '     class="alert" ' +
            '     ng-bind-html="notification.text | trustHtml">' +
            '' +
            '</div>' +
            '',
            link: function (scope) {
                var item = (scope.for) ? scope.for : 'default'; // for backward compatibility

                scope.$watch(getNotification, function (notifyObj) {
                    scope.notifyObj = notifyObj;
                }, true);

                function getNotification() {
                    return Notify.obj[item];
                }
            }
        };
    }
})();
