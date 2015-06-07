(function() {
'use strict';

var playerUpgradesController = angular.module('playerUpgradesController', []);

playerUpgradesController.controller('player.upgrades.Ctrl', ['$scope','$stateParams','$state',
function($scope,$stateParams,$state) {
  $state.current.data.test.stateChangeCount++;

  $scope.buy = function( type ) {
    var gen_config = $state.current.data.config.generators[type];
    var generator = $state.current.data.generators[type];

    if ($state.current.data.resources['dosh'] < generator.costs['dosh'].at) {
      console.log('Not enough dosh for that one, babe');
      return;
    }

    generator.count++;
    $state.current.data.resources['dosh'] -= generator.costs['dosh'].at;

    update_costs(type);
    update_produces(type);
  };

  $scope.buy_upgrade = function (type) {
    if ($state.current.data.upgrades.bought.indexOf(type) !== -1) {
      return;
    }

    var config = $state.current.data.config.upgrades[type];
    var generators = $state.current.data.generators;

    var generator = generators[config.effect.target];
    var prop = generator[config.effect.prop];

    var resource = prop[config.effect.resource];
    resource.add += config.effect.add;
    resource.mult *= config.effect.mult;

    update_costs(config.effect.target);
    update_produces(config.effect.target);

    var bought = $state.current.data.upgrades.bought;
    bought.push( type );
  };

  $scope.cost_for_generator = function(type) {
    var generator = $state.current.data.generators[type];
    return generator.costs['dosh'].at;
  }

  var update_costs = function(type) {
    var generator = $state.current.data.generators[type];
    var generator_config = $state.current.data.config.generators[type];

    for (var cost_id in generator_config.base_cost) {
      if (generator_config.base_cost.hasOwnProperty(cost_id)) {
        var generator_cost = generator.costs[cost_id];

        var level_cost = generator_config.cost_fn( generator.count );
        generator_cost.at = level_cost * (1 + generator_cost.add) * generator_cost.mult;
      }
    }
  }

  var update_produces = function(type) {
    var generator = $state.current.data.generators[type];
    var generator_config = $state.current.data.config.generators[type];

    for (var produces_id in generator_config.produces) {
      if (generator_config.produces.hasOwnProperty(produces_id)) {
        var gen_produces = generator.produces[ produces_id ];

        gen_produces.at = gen_produces.base
                          * (1 + gen_produces.add)
                          * gen_produces.mult;
      }
    }
  }
}]);
}());
