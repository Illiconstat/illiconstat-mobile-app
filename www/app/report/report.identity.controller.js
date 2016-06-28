var report = angular.module('report');

var reportIdentityCtrl = ReportIdentityCtrl;
reportIdentityCtrl.$inject = ['$scope', '$state'];

report.controller('ReportIdentityCtrl', reportIdentityCtrl);

function ReportIdentityCtrl($scope, $state) {
    var vm = this;
    $scope.$emit($state.current.data.completeEventName, [1, 2, 3]);
}