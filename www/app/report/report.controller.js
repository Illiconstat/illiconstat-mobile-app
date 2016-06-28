(function () {
    var report = angular.module('report');

    var reportCtrl = ReportCtrl;
    reportCtrl.$inject = ['$scope', '$state'];

    report.controller('ReportCtrl', reportCtrl);

    function ReportCtrl($scope, $state) {
        var vm = this;
        var step = 1;
        vm.stepEquals = stepEquals;
        vm.setStep = setStep;

        // TODO register complete events
        $state.current.data.completeEventNames.forEach(function (completeEventName) {
            $scope.$on(completeEventName, function (event, data) {
                console.log(data);
            });
        });

        $state.transitionTo('report.identity');

        function stepEquals(expectedStep) {
            return step === expectedStep;
        }

        function setStep(newStep) {
            step = newStep;
        }
    }

})();