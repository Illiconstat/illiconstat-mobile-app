// TODO dependency injection
(function () {
    var config = ReportConfig;
    config.$inject = ['$stateProvider'];
    angular.module('report', ['nools', 'ui.router'])
           .config(config);

    function ReportConfig($stateProvider) {
        // This array only should be updated. Everything else is created by convention
        var reportStateNames = ['report.identity'];

        // This is generic for all the report child states
        var completeEventNames = [];
        reportStateNames.forEach(function (name) {
            var childStateName = name.replace('report.', '');
            var completeEventName = 'report.' + childStateName + '.complete';
            completeEventNames.push(completeEventName);
            $stateProvider.state(name, {
                url: childStateName + '/',
                templateUrl: 'app/report/' + childStateName + '.html',
                controller: 'Report' + capitalizeFirst(childStateName) + 'Ctrl as vm',
                data: {
                    completeEventName: completeEventName
                }
            });
        });
        
        $stateProvider.state('report', {
            url: '/report/',
            templateUrl: 'app/report/report.html',
            controller: 'ReportCtrl as vm',
            data: {
                completeEventNames: completeEventNames
            }
        });

        function capitalizeFirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }
})();
