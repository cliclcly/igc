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

      for (var building in $state.current.data.buildings) {
        if ($state.current.data.buildings.hasOwnProperty( building )) {
          produce.call(this, building, delta);
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

  var produce = function( automatic_id, delta) {
    var automatic = $state.current.data.config.automatics[automatic_id];
    var count = $state.current.data.buildings[automatic_id].count;
    var rate = $state.current.data.buildings[automatic_id].produces['dosh'].at;
    $state.current.data.resources['dosh'] += count * rate * delta / 1000;
  };

  IGC_initGame($state);
}]);
}());

var IGC_initGame = function($state) {
  if ( typeof $state.current.data.buildings == 'undefined') {
    $state.current.data.buildings = {};
  }

  for (var id in $state.current.data.config.automatics) {
    if ($state.current.data.config.automatics.hasOwnProperty(id)) {
      var buildings = $state.current.data.buildings;
      var automatic = $state.current.data.config.automatics[id];

      buildings[id] = { count: 0,
                        costs: {},
                        produces: automatic.produces};

      for (var cost_id in automatic.base_cost) {
        if (automatic.base_cost.hasOwnProperty(cost_id)) {
          buildings[id].costs[cost_id] = { base: automatic.base_cost[cost_id],
                                  at: automatic.base_cost[cost_id],
                                  add: 0,
                                  mult: 1};
        }
      }

    }
  }

  if (typeof $state.current.data.resources == 'undefined') {
    $state.current.data.resources = {};

    for (var id in $state.current.data.config.resources) {
      if ( $state.current.data.config.resources.hasOwnProperty(id) ) {
        $state.current.data.resources[id] = 0;
      }
    }
  };
}
