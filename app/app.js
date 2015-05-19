(function() {
'use strict';

var app = angular.module('app', [
  'ui.router',
  'creatorModuleApp',
  'playerModuleApp',
  'nameUnique',
  'filtersModule'
])


.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider){
  //If invalid url, go to this url
  $urlRouterProvider.otherwise("/creator/resources");

  $stateProvider.state('ig', {
    url:"",
    abstract: true,
    data: {
      test: {
        stateChangeCount: 0
      },
      creator: {
        resources: [],
        automatics: []
      }
    }
  });
}]);


}());
