(function() {
'use strict';

var playerModuleApp = angular.module('playerModuleApp', [
  'playerController',
  'playerGameController',
  'playerStatsController',
  'playerUpgradesController'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('ig.player', {
    url: '/player',
    abstract: true,
    data: {
      money: 10,
      buildings : {
        pistol : 0,
        m4 : 0,
        katana : 0
      }
    },
    views: {
        '@': {
            templateUrl: 'app/player/partials/player.html',
            controller: 'player.Ctrl'
        }
    }
  })
  .state('ig.player.game', {
    url: '/game',
    templateUrl: 'app/player/partials/player.game.html',
    controller: 'player.game.Ctrl'
  })
  .state('ig.player.stats', {
    url: '/stats',
    templateUrl: 'app/player/partials/player.stats.html',
    controller: 'player.stats.Ctrl'
  })
  .state('ig.player.upgrades', {
    url: '/upgrades',
    templateUrl: 'app/player/partials/player.upgrades.html',
    controller: 'player.upgrades.Ctrl'
  });


}]);
}());
