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

      for (var id in $state.current.data.config.automatics) {
        if ($state.current.data.config.automatics.hasOwnProperty(id)) {
          var automatic = $state.current.data.config.automatics[id];

          $state.current.data.buildings[id] = { count: 0,
                                                cost: automatic.base_cost,
                                                produces: automatic.produces};
        }
      }

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
}]);
}());
