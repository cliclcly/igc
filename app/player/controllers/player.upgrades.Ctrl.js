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

    var automatic = $state.current.data.config.automatics[type];
    var building = $state.current.data.buildings[type];

    if ($state.current.data.resources['dosh'] < building.cost) {
      console.log('Not enough dosh for that one, babe');
      return;
    }

    building.count++;
    $state.current.data.resources['dosh'] -= building.cost;

    var new_count = building.count;
    var new_cost = $state.current.data.config.automatics[type].cost_fn( new_count );
    building.cost = new_cost;
  };

  $scope.buy_upgrade = function (type) {
    var config = $state.current.data.config.upgrades[type];
    var buildings = $state.current.data.buildings;

    var building = buildings[config.effect.target];
    var prop = building[config.effect.prop];

    var resource = prop[config.effect.resource];
    resource.add += config.effect.add;
    resource.mult *= config.effect.mult;

    resource.at = resource.base * (1 + resource.add) * resource.mult;
  };
}]);
}());
