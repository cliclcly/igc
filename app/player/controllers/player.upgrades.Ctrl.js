(function() {
'use strict';

var playerUpgradesController = angular.module('playerUpgradesController', []);

playerUpgradesController.controller('player.upgrades.Ctrl', ['$scope','$stateParams','$state',
function($scope,$stateParams,$state) {
  console.log("Player Upgrades Controller");
  $state.current.data.test.stateChangeCount++;

  $scope.buy = function( type ) {
    if (!$state.current.data.buildings[type]) {
      $state.current.data.buildings[type] = 0;
    }

    $state.current.config.automatics.forEach( function(automatic, index) {
      if (automatic.id === type) {
        if ($state.current.data.money < automatic.base_cost) {
          return;
        }
        
        $state.current.data.buildings[type]++;
        $state.current.data.money -= automatic.base_cost;
      }
    });
  };

}]);
}());
