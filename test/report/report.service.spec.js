'use strict';

(function () {
    var subject;
    beforeEach(module('illiconstat'));
    beforeEach(inject(function (reportService, nools) {
        subject = reportService;
        nools.deleteFlows();
    }));

    it('should return parking statements for first call', function (done) {
        getParkingStatements().then(function (nextStatementGroup) {
            var expectedStatements = ['question.stationnement.ou.arret', 'question.prenait.stationnement',
                                      'question.sortait.parking.lieu.prive.chemin.terre',
                                      'question.sengageait.parking.lieu.prive.chemin.terre'];
            expect(nextStatementGroup.statements).toEqual(expectedStatements);
        }).then(done);
    });

    it('should return roundabouts statements when no parking statement has been selected', function (done) {
        getRoundaboutStatements().then(function (nextStatementGroup) {
            var expectedStatements = ['question.sengageait.sur.place.sens.giratoire',
                                      'question.roulait.sur.place.sens.giratoire'];
            expect(nextStatementGroup.statements).toEqual(expectedStatements);
        }).then(done);
    });

    it('should return empty statements when a parking statement has been selected', function (done) {
        getParkingStatements().then(function () {
            return subject.getNextStatementGroup('question.stationnement.ou.arret');
        }).then(function (nextStatementGroup) {
            var expectedStatements = [];
            expect(nextStatementGroup.statements).toEqual(expectedStatements);
        }).then(done);
    });

    it('should return line statements when no roundabout statement has been selected', function (done) {
        getLineStatements().then(function (nextStatementGroup) {
            var expectedStatements = ['question.heurtait.arriere.en.roulant.meme.sens.meme.file',
                                      'question.roulait.meme.sens.file.differente'];
            expect(nextStatementGroup.statements).toEqual(expectedStatements);
        }).then(done);
    });

    it('should return move back statements when roundabout statement has been selected', function (done) {
        getRoundaboutStatements().then(function () {
            return subject.getNextStatementGroup('question.sengageait.sur.place.sens.giratoire');
        }).then(function (nextStatementGroup) {
            var expectedStatements = ['question.reculait'];
            expect(nextStatementGroup.statements).toEqual(expectedStatements);
        }).then(done);
    });

    it('should return move back when no line statement has been selected', function (done) {
        getMoveBackStatement().then(function (nextStatementGroup) {
            var expectedStatements = ['question.reculait'];
            expect(nextStatementGroup.statements).toEqual(expectedStatements);
        }).then(done);
    });

    it('should return line change statements if move back has not been selected', function (done) {
        getLineChangeStatement().then(function (nextStatementGroup) {
            var expectedStatements = ['question.changeait.file', 'question.doublait'];
            expect(nextStatementGroup.statements).toEqual(expectedStatements);
        }).then(done);
    });

    it('should return empty statement if move back has been selected', function (done) {
        getMoveBackStatement().then(function () {
            return subject.getNextStatementGroup('question.reculait');
        }).then(function (nextStatementGroup) {
            var expectedStatements = [];
            expect(nextStatementGroup.statements).toEqual(expectedStatements);
        }).then(done);
    });

    it('should return turn statements if no line change statement has been selected', function (done) {
        getTurnStatement().then(function (nextStatementGroup) {
            var expectedStatements = ['question.virait.droite', 'question.virait.gauche'];
            expect(nextStatementGroup.statements).toEqual(expectedStatements);
        }).then(done);
    });

    it('should return opposite way statement if a line change statement has been selected', function (done) {
        getLineChangeStatement().then(function () {
            return subject.getNextStatementGroup('question.doublait');
        }).then(function (nextStatementGroup) {
            var expectedStatements = ['question.empietait.voie.circulation.sens.inverse'];
            expect(nextStatementGroup.statements).toEqual(expectedStatements);
        }).then(done);
    });

    it('should return opposite way statement if no turn statement has been selected', function (done) {
        getOppositeWayStatement().then(function (nextStatementGroup) {
            var expectedStatements = ['question.empietait.voie.circulation.sens.inverse'];
            expect(nextStatementGroup.statements).toEqual(expectedStatements);
        }).then(done);
    });

    it('should return red light not observed statement if a turn statement has been selected', function (done) {
        getTurnStatement().then(function () {
            return subject.getNextStatementGroup('question.virait.droite');
        }).then(function (nextStatementGroup) {
            var expectedStatements = ['question.avait.pas.observe.signal.priorite.ou.feu.rouge'];
            expect(nextStatementGroup.statements).toEqual(expectedStatements);
        }).then(done);
    });

    it('should return red light not observed statement if opposite way statement has not been selected',
       function (done) {
           getRedLightNotObservedStatement().then(function (nextStatementGroup) {
               var expectedStatements = ['question.avait.pas.observe.signal.priorite.ou.feu.rouge'];
               expect(nextStatementGroup.statements).toEqual(expectedStatements);
           }).then(done);
       });

    it('should return red light not observed statement if opposite way statement has been selected',
       function (done) {
           getOppositeWayStatement().then(function () {
               return subject.getNextStatementGroup('question.empietait.voie.circulation.sens.inverse');
           }).then(function (nextStatementGroup) {
               var expectedStatements = ['question.avait.pas.observe.signal.priorite.ou.feu.rouge'];
               expect(nextStatementGroup.statements).toEqual(expectedStatements);
           }).then(done);
       });

    it('should return coming from right statement if red light not observed statement has not been selected',
       function (done) {
           getRedLightNotObservedStatement().then(nextStatementGroup).then(function (nextStatementGroup) {
               var expectedStatements = ['question.venait.de.droite.au.carrefour'];
               expect(nextStatementGroup.statements).toEqual(expectedStatements);
           }).then(done);
       });

    it('should return coming from right statement if red light not observed statement has been selected',
       function (done) {
           getRedLightNotObservedStatement().then(function () {
               return subject.getNextStatementGroup('question.avait.pas.observe.signal.priorite.ou.feu.rouge');
           }).then(function (nextStatementGroup) {
               var expectedStatements = ['question.venait.de.droite.au.carrefour'];
               expect(nextStatementGroup.statements).toEqual(expectedStatements);
           }).then(done);
       });

    it('should return empty statement if coming from right statement has not been selected',
       function (done) {
           getComingFromRightInCrossroadsStatement().then(nextStatementGroup).then(function (nextStatementGroup) {
               var expectedStatements = [];
               expect(nextStatementGroup.statements).toEqual(expectedStatements);
           }).then(done);
       });

    it('should return coming from right statement if coming from right statement has been selected',
       function (done) {
           getComingFromRightInCrossroadsStatement().then(function () {
               return subject.getNextStatementGroup('question.venait.de.droite.au.carrefour');
           }).then(function (nextStatementGroup) {
               var expectedStatements = [];
               expect(nextStatementGroup.statements).toEqual(expectedStatements);
           }).then(done);
       });

    var getParkingStatements = function () {
        return subject.getNextStatementGroup();
    };

    var getRoundaboutStatements = function () {
        return getParkingStatements().then(nextStatementGroup);
    };

    var getLineStatements = function () {
        return getRoundaboutStatements().then(nextStatementGroup);
    };

    var getMoveBackStatement = function () {
        return getLineStatements().then(nextStatementGroup);
    };

    var getLineChangeStatement = function () {
        return getMoveBackStatement().then(nextStatementGroup);
    };

    var getTurnStatement = function () {
        return getLineChangeStatement().then(nextStatementGroup);
    };

    var getOppositeWayStatement = function () {
        return getTurnStatement().then(nextStatementGroup);
    };

    var getRedLightNotObservedStatement = function () {
        return getOppositeWayStatement().then(nextStatementGroup);
    };

    var getComingFromRightInCrossroadsStatement = function () {
        return getRedLightNotObservedStatement().then(nextStatementGroup);
    };

    function nextStatementGroup() {
        return subject.getNextStatementGroup();
    }
})();