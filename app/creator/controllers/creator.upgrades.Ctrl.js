(function() {
'use strict';

var creatorUpgradesController = angular.module('creatorUpgradesController', []);

creatorUpgradesController.controller('creator.upgrades.Ctrl', ['$scope','$stateParams','$state',
function($scope,$stateParams,$state) {
  console.log("Upgrade Controller");
  $state.current.data.test.stateChangeCount++;




}]);
}());
