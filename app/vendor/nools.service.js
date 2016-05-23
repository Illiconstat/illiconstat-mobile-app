'use strict';

(function() {
    var illiconstat = angular.module('illiconstat');

    var NoolsFactory = function NoolsFactory() {
        return require('nools');
    };
    
    NoolsFactory.$inject = [];

    illiconstat.factory('nools', NoolsFactory);
})();