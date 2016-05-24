angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('accueil', {
    url: '/home',
    templateUrl: 'templates/accueil.html',
    controller: 'accueilCtrl'
  })

  .state('constatIdentit', {
    url: '/identite',
    templateUrl: 'templates/constatIdentit.html',
    controller: 'constatIdentitCtrl'
  })

  .state('pV', {
    url: '/pv',
    templateUrl: 'templates/pV.html',
    controller: 'pVCtrl'
  })

  .state('recapitulatif', {
    url: '/recapitulatif',
    templateUrl: 'templates/recapitulatif.html',
    controller: 'recapitulatifCtrl'
  })

  .state('envoie', {
    url: '/envoir',
    templateUrl: 'templates/envoie.html',
    controller: 'envoieCtrl'
  })

  .state('mesConstats', {
    url: '/constats',
    templateUrl: 'templates/mesConstats.html',
    controller: 'mesConstatsCtrl'
  })

  .state('afficherConstat', {
    url: '/view',
    templateUrl: 'templates/afficherConstat.html',
    controller: 'afficherConstatCtrl'
  })

$urlRouterProvider.otherwise('/home')

  

});