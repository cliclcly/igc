(function() {
'use strict';

var creatorResourcesController = angular.module('creatorResourcesController', []);

creatorResourcesController.controller('creator.resources.Ctrl', ['$scope','$stateParams','$state',
function($scope,$stateParams,$state) {
  console.log("Resources Controller");
  $state.current.data.test.stateChangeCount++;

  $scope.resourceInfo = {
    resourceName: ""
  };

  $scope.addResource = function(form) {
    console.log(form);
    if(form.$invalid) {
      alert("Form is invalid");
      return;
    }

    $state.current.data.creator.resources.push({name: $scope.resourceInfo.resourceName});
    $scope.resourceInfo.resourceName = "";
  };

  $scope.remove = function(resource) {
    for(var x = 0; x < $state.current.data.creator.resources.length; x++) {
      if($state.current.data.creator.resources[x].name === resource.name) {
        $state.current.data.creator.resources.splice(x, 1);
        break;
      }
    }
  };


}]);
}());
