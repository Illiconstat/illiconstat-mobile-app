'use strict';

(function () {
    var subject;
    // beforeEach(angular.mock.module('illiconstat'));
    beforeEach(module('illiconstat'));
    beforeEach(inject(function(pvService) {
        subject = pvService;
    }));

    it('should return initial question "En stationement" when no previous question is provided', function () {
        var nextQuestion = subject.getNextQuestion();
        expect(nextQuestion).toEqual('question.stationnement.ou.arret');
    });
})();