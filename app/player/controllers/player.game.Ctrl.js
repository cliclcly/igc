(function () {
  'use strict;'

  var playerGameController = angular.module('playerGameController', []);

  playerGameController.controller('player.game.Ctrl', ['$scope', '$stateParams', '$state',
  function($scope, $stateParams, $state) {
    $scope.killZed = function() {
      $scope.$emit('killzed', []);
    };
  }]);
})();
