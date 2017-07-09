(function () {
    'use strict';

    angular.module('app')
        .filter('trustHtml', trustHtml);

    trustHtml.$inject = ['$sce'];

    function trustHtml($sce) {
        return function (html) {
            if (typeof(html) !== 'string' && !(html instanceof String)) {
                return;
            }
            return $sce.trustAsHtml(html);
        };
    }
})();
