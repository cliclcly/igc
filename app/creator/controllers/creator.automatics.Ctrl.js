(function() {
'use strict';

var creatorAutomaticsController = angular.module('creatorAutomaticsController', []);

creatorAutomaticsController.controller('creator.automatics.Ctrl', ['$scope','$stateParams','$state',
function($scope,$stateParams,$state) {
  console.log("Automatics Controller");
  $state.current.data.test.stateChangeCount++;

  $scope.selected = {
    resource: {}
  };



}]);
}());
