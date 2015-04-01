(function() {
'use strict';

var playerUpgradesController = angular.module('playerUpgradesController', []);

playerUpgradesController.controller('player.upgrades.Ctrl', ['$scope','$stateParams','$state',
function($scope,$stateParams,$state) {
  console.log("Player Upgrades Controller");
  $state.current.data.test.stateChangeCount++;


}]);
}());
