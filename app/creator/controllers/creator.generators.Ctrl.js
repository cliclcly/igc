(function() {
'use strict';

var creatorGeneratorsController = angular.module('creatorGeneratorsController', []);

creatorGeneratorsController.controller('creator.generators.Ctrl', ['$scope','$stateParams','$state',
function($scope,$stateParams,$state) {
  console.log("generators Controller");
  $state.current.data.test.stateChangeCount++;

  $scope.selected = {
    resource: {}
  };

  $scope.submit = function(form) {
    if(form.$invalid) {
      alert("Form is invalid");
      return;
    }
    var copy = angular.copy($scope.selected);
    $state.current.data.creator.generators.push(copy);
    $scope.selected = {};
  };



}]);
}());
