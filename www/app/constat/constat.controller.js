"use strict";

var constat = angular.module('constat');

var constatCtrl = ConstatCtrl;

constat.controller('ConstatCtrl', constatCtrl);

function ConstatCtrl() {
    var vm = this;
    var step = 1;
    vm.stepEquals = stepEquals;
    vm.setStep = setStep;

    function stepEquals(expectedStep) {
        return step === expectedStep;
    }

    function setStep(newStep) {
        step = newStep;
    }
}