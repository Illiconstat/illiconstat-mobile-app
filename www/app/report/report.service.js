'use strict';


var Reply = function Reply(question, answer) {
    this.question = question;
    this.answer = answer;
};

(function () {
    angular.module('illiconstat', ['nools']);
    var illiconstat = angular.module('illiconstat');

    var reportServiceFactory = function pvServiceProvider(nools) {
        var nextQuestion;
        var reportQuestionsFlow = nools.flow('Report questions', function (flow) {
            flow.rule('Stationnement ou arret', [Reply, 'rep', 'isUndefinedOrNull(rep.question)'], function () {
                nextQuestion = 'question.stationnement.ou.arret';
            });
            flow.rule('Plus de question',
                      [Reply, 'rep', 'rep.question == "question.stationnement.ou.arret" && rep.answer == "oui"'],
                      function () {
                          nextQuestion = 'no.more.question';
                      });
            flow.rule('Quitte stationnement ou ouvre porte',
                      [Reply, 'rep', 'rep.question == "question.stationnement.ou.arret" && rep.answer == "no"'],
                      function () {
                          nextQuestion = 'question.quitte.stationnement.ouvre.porte';
                      });
        });
        var reportQuestionsSession = reportQuestionsFlow.getSession();

        return {
            getNextQuestion: getNextQuestion
        };

        function getNextQuestion(reply) {
            reportQuestionsSession.assert(reply || new Reply());
            return reportQuestionsSession.match(function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('done');
                }
            }).then(function () {
                return nextQuestion;
            });
        }
    };

    reportServiceFactory.$inject = ['nools'];

    illiconstat.factory('reportService', reportServiceFactory);
})();