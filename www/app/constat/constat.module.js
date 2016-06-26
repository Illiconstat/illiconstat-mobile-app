"use strict";

angular.module('constat', [])
       .config(function ($stateProvider) {
           $stateProvider.state('constat', {
               url: 'constat',
               templateUrl: 'app/constat/constat.html',
               controller: 'ConstatCtrl as vm'
           });
           $stateProvider.state('constat.identite', {
               url: 'constat/identie',
               templateUrl: 'app/constat/identity.html',
               controller: 'ConstatIdentityCtrl as vm'
           });
       });