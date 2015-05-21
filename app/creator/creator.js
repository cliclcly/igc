(function() {
'use strict';

var creatorModuleApp = angular.module('creatorModuleApp', [
  'creatorController',
  'creatorResourcesController',
  'creatorGeneratorsController',
  'creatorUpgradesController'


])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('ig.creator', {
    url: '/creator',
    abstract: true,
    data: {

    },
    views: {
        '@': {
            templateUrl: 'app/creator/partials/creator.html',
            controller: 'creator.Ctrl'
        }
    }
  })
  .state('ig.creator.resources', {
    url: '/resources',
    templateUrl: 'app/creator/partials/creator.resources.html',
    controller: 'creator.resources.Ctrl'
  })
  .state('ig.creator.generators', {
    url: '/generators',
    templateUrl: 'app/creator/partials/creator.generators.html',
    controller: 'creator.generators.Ctrl'
  })
  .state('ig.creator.upgrades', {
    url: '/upgrades',
    templateUrl: 'app/creator/partials/creator.upgrades.html',
    controller: 'creator.upgrades.Ctrl'
  });


}]);
}());
