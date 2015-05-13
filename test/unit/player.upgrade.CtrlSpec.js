'use strict;'

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
    $state.current.data = { test : { stateChangeCount: 0 }};
    $stateParams = $injector.get('$stateParams');
  }));

  it('should increment building on buy', function() {
    $state.current.data.buildings = { test: 0 };

    var ctrl = $controller('player.upgrades.Ctrl', {  '$scope': $scope,
                                                      '$state': $state,
                                                      '$stateParams': $stateParams });

    $scope.buy("test");

    expect($state.current.data.buildings["test"]).toBe(1);
  });
});
