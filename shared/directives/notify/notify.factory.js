'use strict';

angular.module('app.service.notify.factory', []);

angular.module('app.service.notify.factory').factory('Notify', function () {
    var notifyObj = {};

    function red (item, text) {
        if(!text) { // for backward compatibility
            text = item;
            item = 'default';
        }

        var curNotify = {
            class: 'alert-danger',
            text: text
        };
        notifyObj[item] = ( notifyObj[item] ) ? notifyObj[item] : [];
        notifyObj[item].push(curNotify);
    }

    function green (item, text) {
        if(!text) { // for backward compatibility
            text = item;
            item = 'default';
        }

        var curNotify = {
            class: 'alert-success',
            text: text
        };
        notifyObj[item] = ( notifyObj[item] ) ? notifyObj[item] : [];
        notifyObj[item].push(curNotify);
    }

    function yellow (item, text) {
        if(!text) { // for backward compatibility
            text = item;
            item = 'default';
        }

        var curNotify = {
            class: 'alert-warning',
            text: text
        };
        notifyObj[item] = ( notifyObj[item] ) ? notifyObj[item] : [];
        notifyObj[item].push(curNotify);
    }

    function clean(item) {
        if(item) {
            delete notifyObj[item];
        } else {
            for(var key in notifyObj) {
                if(notifyObj[key].pop) {
                    notifyObj[key].length = 0;
                }
            }
        }
    }

    return {
        red: red,
        green: green,
        clean: clean,
        yellow: yellow,
        obj: notifyObj
    };

});

