'use strict';

(function () {
    var subject;
    beforeEach(module('illiconstat'));
    beforeEach(inject(function (reportService, nools) {
        subject = reportService;
        nools.deleteFlows();
    }));

    it('should return initial question "question.stationnement.ou.arret" when no answer is provided', function (done) {
        var nextQuestionPromise = subject.getNextQuestion();
        nextQuestionPromise.then(function(nextQuestion) {
            expect(nextQuestion).toEqual('question.stationnement.ou.arret');
        }).then(done);
    });

    it('should return question "question.quitte.stationnement.ouvre.porte" when previous question is "question.stationnement.ou.arret" and answer is "no"', function (done) {
        var nextQuestionPromise = subject.getNextQuestion();
        nextQuestionPromise.then(function(nextQuestion) {
            return subject.getNextQuestion(new Reply('question.stationnement.ou.arret', 'no'))
        }).then(function(nextQuestion) {
            expect(nextQuestion).toEqual('question.quitte.stationnement.ouvre.porte');
        }).then(done);
    });

    it('should return question "no.more.question" when previous question is "question.stationnement.ou.arret" and answer is "yes"', function (done) {
        var nextQuestionPromise = subject.getNextQuestion();
        nextQuestionPromise.then(function(nextQuestion) {
            return subject.getNextQuestion(new Reply('question.stationnement.ou.arret', 'oui'))
        }).then(function(nextQuestion) {
            expect(nextQuestion).toEqual('no.more.question');
        }).then(done);
    });
})();