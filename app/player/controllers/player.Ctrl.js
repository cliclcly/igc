(function() {
'use strict';

var playerController = angular.module('playerController', []);

playerController.controller('player.Ctrl', ['$scope','$stateParams','$state','$interval',
function($scope,$stateParams,$state,$interval) {
  var delta, last_time = null;
  $scope.frameCount = 0;

  $scope.$on('killzed', function(args) {
    $state.current.data.money++;
  });

  var updateGame = function( time ) {
    if ( !last_time ) {
      last_time = time;
    } else {
      delta = time - last_time;
      $scope.frameCount = delta;

      var dosh = $state.current.data.buildings.pistol * 0.1 * delta / 1000;
      $state.current.data.money += dosh;

      dosh = $state.current.data.buildings.m4 * 0.333 * delta / 1000;
      $state.current.data.money += dosh;

      dosh = $state.current.data.buildings.katana * 1 * delta / 1000;
      $state.current.data.money += dosh;

      last_time = time;
    }

    if(!$scope.$$phase) {
      $scope.$apply();
    }
    window.requestAnimationFrame( updateGame );
  };

  window.requestAnimationFrame( updateGame );
}]);
}());
