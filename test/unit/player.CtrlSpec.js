'use stric;'

describe('Player Upgrades Controller', function() {

  var $rootScope, $scope, $controller, $injector, $state, $stateParams;

  beforeEach( function() {
    module('playerUpgradesController');
    module('ui.router');
  });

  beforeEach( inject( function( _$rootScope_, _$controller_, _$injector_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $injector = _$injector_;
    $state = $injector.get('$state');
    $stateParams = $injector.get('$stateParams');

    $state.current.data = { test: {
                              stateChangeCount: 0
                            },
                            buildings: {
                              testBuilding: 0
                            }
                          };
  }));
});
