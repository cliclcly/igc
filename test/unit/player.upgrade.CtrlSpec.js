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
    $state.current.config = { automatics: [
      {id: '9mm', name: '9mm', description: '9mm', base_cost: 1}
    ]};

    $stateParams = $injector.get('$stateParams');
  }));

  it('should increment building on buy', function() {
    $state.current.data.buildings = { '9mm': 0 };

    var ctrl = $controller('player.upgrades.Ctrl', {  '$scope': $scope,
                                                      '$state': $state,
                                                      '$stateParams': $stateParams });

    $scope.buy('9mm');

    expect($state.current.data.buildings['9mm']).toBe(1);
  });

  it('should decrement dosh on buy', function() {
    $state.current.data.money = 10;
    $state.current.data.buildings = {};

    var ctrl = $controller('player.upgrades.Ctrl', {  '$scope': $scope,
                                                      '$state': $state,
                                                      '$stateParams': $stateParams });

    $scope.buy('9mm');

    expect( $state.current.data.money ).toBe(9);
  });

  it('should not increment building count if not enough resource', function() {
    $state.current.data.buildings = { '9mm': 0 };
    $state.current.data.money = 0;

    var ctrl = $controller('player.upgrades.Ctrl', {  '$scope': $scope,
                                                      '$state': $state,
                                                      '$stateParams': $stateParams });

    $scope.buy('9mm');

    expect( $state.current.data.buildings['9mm'] ).toBe(0);
  });
});
