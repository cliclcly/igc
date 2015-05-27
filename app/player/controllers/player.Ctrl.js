(function() {
'use strict';

var playerController = angular.module('playerController', []);

playerController.controller('player.Ctrl', ['$scope','$stateParams','$state','$interval',
function($scope,$stateParams,$state,$interval) {
  $scope.last_time = null;
  var delta = null;

  $scope.$on('killzed', function(args) {
    $state.current.data.resources['dosh']++;
  });

  $scope.updateGame = function( time ) {
    if ( ! $scope.last_time ) {
      $scope.last_time = time;
    } else {
      delta = time - $scope.last_time;

      for (var generator in $state.current.data.generators) {
        if ($state.current.data.generators.hasOwnProperty( generator )) {
          produce.call(this, generator, delta);
        }
      }

      $scope.last_time = time;
    }

    if(!$scope.$$phase) {
      $scope.$apply();
    }
    window.requestAnimationFrame( $scope.updateGame );
  };

  window.requestAnimationFrame( $scope.updateGame );

  var produce = function( gen_id, delta) {
    var generator = $state.current.data.config.generators[ gen_id ];
    var count = $state.current.data.generators[ gen_id ].count;
    var rate = $state.current.data.generators[ gen_id ].produces['dosh'].at;
    $state.current.data.resources['dosh'] += count * rate * delta / 1000;
  };

  IGC_initGame($state);
}]);
}());

var IGC_initGame = function($state) {
  if ( typeof $state.current.data.generators == 'undefined') {
    $state.current.data.generators = {};
  }

  // generators
  for (var id in $state.current.data.config.generators) {
    if ($state.current.data.config.generators.hasOwnProperty(id)) {
      var generators = $state.current.data.generators;
      var gen_config = $state.current.data.config.generators[id];

      generators[id] = {  count: 0,
                          costs: {},
                          produces: gen_config.produces};

      for (var cost_id in gen_config.base_cost) {
        if (gen_config.base_cost.hasOwnProperty(cost_id)) {
          generators[id].costs[cost_id] = { base: gen_config.base_cost[cost_id],
                                            at: gen_config.base_cost[cost_id],
                                            add: 0,
                                            mult: 1};
        }
      }
    }
  }

  // resources
  if (typeof $state.current.data.resources == 'undefined') {
    $state.current.data.resources = {};

    for (var id in $state.current.data.config.resources) {
      if ( $state.current.data.config.resources.hasOwnProperty(id) ) {
        $state.current.data.resources[id] = 0;
      }
    }
  };

  // upgrades
  if (typeof $state.current.data.upgrades == 'undefined') {
    $state.current.data.upgrades = { bought: [] };

    $state.current.data.upgrades.hasBought = function(upgrade) {
      return $state.current.data.upgrades.bought.indexOf(upgrade) != -1;
    }
  }
}
