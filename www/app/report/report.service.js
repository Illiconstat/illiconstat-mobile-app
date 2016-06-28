(function () {
    var report = angular.module('report');

    function StatementGroup() {
        this.statements = Array.prototype.slice.call(arguments);

        this.contains = function contains(question) {
            return this.statements.indexOf(question) !== -1;
        }
    }

    var PARKING_STATEMENTS = new StatementGroup('question.stationnement.ou.arret', 'question.prenait.stationnement',
        'question.sortait.parking.lieu.prive.chemin.terre', 'question.sengageait.parking.lieu.prive.chemin.terre');

    var ROUNDABOUT_STATEMENTS = new StatementGroup('question.sengageait.sur.place.sens.giratoire',
        'question.roulait.sur.place.sens.giratoire');

    var LINE_STATEMENTS = new StatementGroup('question.heurtait.arriere.en.roulant.meme.sens.meme.file',
        'question.roulait.meme.sens.file.differente');

    var MOVE_BACK_STATEMENT = new StatementGroup('question.reculait');

    var LINE_CHANGE_STATEMENTS = new StatementGroup('question.changeait.file', 'question.doublait');

    var TURN_STATEMENTS = new StatementGroup('question.virait.droite', 'question.virait.gauche');

    var OPPOSITE_WAY_STATEMENT = new StatementGroup('question.empietait.voie.circulation.sens.inverse');

    var RED_LIGHT_NOT_OBSERVED_STATEMENT =
        new StatementGroup('question.avait.pas.observe.signal.priorite.ou.feu.rouge');

    var COMING_FROM_RIGHT_IN_CROSSROADS_STATEMENT =
        new StatementGroup('question.venait.de.droite.au.carrefour');

    var EMPTY_STATEMENT = new StatementGroup();

    function ReportFact(statementGroup, selectedStatement) {
        this.statementGroup = statementGroup;
        this.selectedStatement = selectedStatement;
    }

    var reportServiceFactory = function pvServiceProvider(nools) {
        var statementGroup;
        var reportQuestionsFlow = nools.flow('Report questions', function (flow) {
            flow.rule('PARKING', [ReportFact, 'fact', 'isUndefinedOrNull(fact.statementGroup)'],
                      function () {
                          statementGroup = PARKING_STATEMENTS;
                      });

            flow.rule('ROUNDABOUT', [ReportFact, 'reportFact', function (facts) {
                          var reportFact = facts.reportFact;
                          return PARKING_STATEMENTS === reportFact.statementGroup && !reportFact.selectedStatement;
                      }],
                      function () {
                          statementGroup = ROUNDABOUT_STATEMENTS;
                      });

            flow.rule('LINE', [ReportFact, 'reportFact', function (facts) {
                          var reportFact = facts.reportFact;
                          return ROUNDABOUT_STATEMENTS === reportFact.statementGroup && !reportFact.selectedStatement;
                      }],
                      function () {
                          statementGroup = LINE_STATEMENTS;
                      });

            flow.rule('MOVE BACK', [ReportFact, 'reportFact', function (facts) {
                          var reportFact = facts.reportFact;
                          return ROUNDABOUT_STATEMENTS.contains(reportFact.selectedStatement) ||
                              LINE_STATEMENTS === reportFact.statementGroup;
                      }],
                      function () {
                          statementGroup = MOVE_BACK_STATEMENT;
                      });

            flow.rule('LINE CHANGE', [ReportFact, 'reportFact', function (facts) {
                          var reportFact = facts.reportFact;
                          return MOVE_BACK_STATEMENT === reportFact.statementGroup && !reportFact.selectedStatement;
                      }],
                      function () {
                          statementGroup = LINE_CHANGE_STATEMENTS;
                      });

            flow.rule('TURN', [ReportFact, 'reportFact', function (facts) {
                          var reportFact = facts.reportFact;
                          return LINE_CHANGE_STATEMENTS === reportFact.statementGroup && !reportFact.selectedStatement;
                      }],
                      function () {
                          statementGroup = TURN_STATEMENTS;
                      });

            flow.rule('OPPOSITE WAY', [ReportFact, 'reportFact', function (facts) {
                          var reportFact = facts.reportFact;
                          return LINE_CHANGE_STATEMENTS.contains(reportFact.selectedStatement) ||
                              TURN_STATEMENTS === reportFact.statementGroup && !reportFact.selectedStatement;
                      }],
                      function () {
                          statementGroup = OPPOSITE_WAY_STATEMENT;
                      });

            flow.rule('RED LIGHT NOT OBSERVED', [ReportFact, 'reportFact', function (facts) {
                          var reportFact = facts.reportFact;
                          return TURN_STATEMENTS.contains(reportFact.selectedStatement) ||
                              OPPOSITE_WAY_STATEMENT === reportFact.statementGroup;
                      }],
                      function () {
                          statementGroup = RED_LIGHT_NOT_OBSERVED_STATEMENT;
                      });

            flow.rule('COMING FROM RIGHT IN CROSSROADS', [ReportFact, 'reportFact', function (facts) {
                          var reportFact = facts.reportFact;
                          return RED_LIGHT_NOT_OBSERVED_STATEMENT === reportFact.statementGroup;
                      }],
                      function () {
                          statementGroup = COMING_FROM_RIGHT_IN_CROSSROADS_STATEMENT;
                      });

            flow.rule('EMPTY', [ReportFact, 'reportFact', function (facts) {
                          var reportFact = facts.reportFact;
                          return PARKING_STATEMENTS.contains(reportFact.selectedStatement) ||
                              MOVE_BACK_STATEMENT.contains(reportFact.selectedStatement) ||
                              COMING_FROM_RIGHT_IN_CROSSROADS_STATEMENT == reportFact.statementGroup;
                      }],
                      function () {
                          statementGroup = EMPTY_STATEMENT;
                      });
        });
        var reportQuestionsSession = reportQuestionsFlow.getSession();

        return {
            initQuestionsSession: initQuestionsSession,
            getNextStatementGroup: getNextStatementGroup
        };

        function initQuestionsSession() {
            reportQuestionsSession = reportQuestionsFlow.getSession();
        }

        function getNextStatementGroup(selectedStatement) {
            reportQuestionsSession.assert(new ReportFact(statementGroup, selectedStatement));
            return reportQuestionsSession.match(function (err) {
                if (err) {
                    console.error(err);
                }
            }).then(function () {
                return statementGroup;
            });
        }
    };

    reportServiceFactory.$inject = ['nools'];

    report.factory('reportService', reportServiceFactory);
})();
