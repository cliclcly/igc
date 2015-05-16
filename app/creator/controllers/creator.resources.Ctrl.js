(function() {
'use strict';

var creatorResourcesController = angular.module('creatorResourcesController', []);

creatorResourcesController.controller('creator.resources.Ctrl', ['$scope','$stateParams','$state','$filter',
function($scope,$stateParams,$state,$filter) {
  $scope.resourceInfo = {};

  $scope.submit = function(form) {
    //If form is invalid, don't add/update the resource
    if(form.$invalid) {
      return;
    }

    //Look forexisting resource with the given name for an update
    var found = false;
    for(var x = 0; x < $state.current.data.creator.resources.length; x++) {
      if($state.current.data.creator.resources[x].name === $scope.resourceInfo.name) {
        $state.current.data.creator.resources[x] = angular.copy($scope.resourceInfo);
        found = true;
        break;
      }
    }

    //Add new resource if not updating an existing resource
    if(!found) {
      $state.current.data.creator.resources.push(angular.copy($scope.resourceInfo));
      $state.current.data.creator.resources = $filter('orderBy')($state.current.data.creator.resources, 'name', false);
    }

    //Set inputs to empty and set form to un-submitted
    $scope.resourceInfo = {};
    form.$submitted = false;
  };

  $scope.remove = function($index) {
    $state.current.data.creator.resources.splice($index, 1);
  };

  $scope.edit = function($index) {
    $scope.resourceInfo = angular.copy($state.current.data.creator.resources[$index]);
  };


}]);
}());
