(function() {
'use strict';

var app = angular.module('app', [
  'ui.router',
  'creatorModuleApp',
  'uniqueName'
])


.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider){

  $urlRouterProvider.otherwise("/creator/resources");

  $stateProvider.state('ig', {
    url:"",
    abstract: true,
    data: {
      test: {
        stateChangeCount: 0
      },
      creator: {
        resources: []
      }
    }
  });
}]);


}());
