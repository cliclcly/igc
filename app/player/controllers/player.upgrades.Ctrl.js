(function() {
'use strict';

var playerUpgradesController = angular.module('playerUpgradesController', []);

playerUpgradesController.controller('player.upgrades.Ctrl', ['$scope','$stateParams','$state',
function($scope,$stateParams,$state) {
  $state.current.data.test.stateChangeCount++;

  $scope.buy = function( type ) {
    if (!$state.current.data.buildings[type]) {
      $state.current.data.buildings[type] = { count: 0};
    }

    var automatic = $state.current.data.config.automatics[type];;
    if ($state.current.data.resources['dosh'] < automatic.base_cost) {
      console.log('Not enough dosh for that one, babe');
      return;
    }

    $state.current.data.buildings[type].count++;
    $state.current.data.resources['dosh'] -= automatic.base_cost;
  };

}]);
}());
