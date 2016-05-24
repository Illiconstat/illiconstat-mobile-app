'use strict';

(function() {
    angular.module('nools', []);
    var nools = angular.module('nools');

    var NoolsFactory = function NoolsFactory() {
        return require('nools');
    };
    
    NoolsFactory.$inject = [];

    nools.factory('nools', NoolsFactory);
})();