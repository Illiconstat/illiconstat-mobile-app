'use strict';

(function () {
    angular.module('illiconstat', []);

    var illiconstat = angular.module('illiconstat');


    var pvServiceFactory = function pvServiceProvider(nools) {
        return {
            getNextQuestion: getNextQuestion
        };

        function getNextQuestion(answer) {
            return 'question.stationnement.ou.arret';
        }
    };

    pvServiceFactory.$inject = ['nools'];

    illiconstat.factory('pvService', pvServiceFactory);
})();