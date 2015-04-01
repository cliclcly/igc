(function() {
'use strict';

var playerStatsController = angular.module('playerStatsController', []);

playerStatsController.controller('player.stats.Ctrl', ['$scope','$stateParams','$state',
function($scope,$stateParams,$state) {
  console.log("Player Stats Controller");
  $state.current.data.test.stateChangeCount++;


}]);
}());
