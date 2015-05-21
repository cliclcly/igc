(function() {
'use strict';

var playerUpgradesController = angular.module('playerUpgradesController', []);

playerUpgradesController.controller('player.upgrades.Ctrl', ['$scope','$stateParams','$state',
function($scope,$stateParams,$state) {
  $state.current.data.test.stateChangeCount++;

  $scope.buy = function( type ) {
    var automatic = $state.current.data.config.automatics[type];
    var building = $state.current.data.buildings[type];

    if ($state.current.data.resources['dosh'] < building.costs['dosh'].at) {
      console.log('Not enough dosh for that one, babe');
      return;
    }

    building.count++;
    $state.current.data.resources['dosh'] -= building.costs['dosh'].at;

    update_costs(type);
    update_produces(type);
  };

  $scope.buy_upgrade = function (type) {
    var config = $state.current.data.config.upgrades[type];
    var buildings = $state.current.data.buildings;

    var building = buildings[config.effect.target];
    var prop = building[config.effect.prop];

    var resource = prop[config.effect.resource];
    resource.add += config.effect.add;
    resource.mult *= config.effect.mult;

    update_costs(config.effect.target);
    update_produces(config.effect.target);
  };

  $scope.cost_for_generator = function(type) {
    var building = $state.current.data.buildings[type];
    return building.costs['dosh'].at;
  }

  var update_costs = function(type) {
    var building = $state.current.data.buildings[type];
    var generator_config = $state.current.data.config.automatics[type];

    for (var cost_id in generator_config.base_cost) {
      if (generator_config.base_cost.hasOwnProperty(cost_id)) {
        var building_cost = building.costs[cost_id];

        var level_cost = generator_config.cost_fn( building.count );
        building_cost.at = level_cost * (1 + building_cost.add) * building_cost.mult;
      }
    }
  }

  var update_produces = function(type) {
    var building = $state.current.data.buildings[type];
    var generator_config = $state.current.data.config.automatics[type];

    for (var produces_id in generator_config.produces) {
      if (generator_config.produces.hasOwnProperty(produces_id)) {
        var building_produces = building.produces[ produces_id ];

        building_produces.at = building_produces.base
                                * (1 + building_produces.add)
                                * building_produces.mult;
      }
    }
  }
}]);
}());
