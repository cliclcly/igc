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
    $state.current.data.config = test_config;

    $stateParams = $injector.get('$stateParams');

    IGC_initGame($state);
  }));

  it('should increment building on buy', function() {
    $state.current.data.resources['dosh'] = 10;

    var ctrl = $controller('player.upgrades.Ctrl', {  '$scope': $scope,
                                                      '$state': $state,
                                                      '$stateParams': $stateParams });

    expect( $state.current.data.generators['9mm'].count).toBe(0);
    $scope.buy('9mm');
    expect($state.current.data.generators['9mm'].count).toBe(1);
  });

  it('should decrement dosh on buy', function() {
    var cost = test_config.generators['9mm'].base_cost['dosh'];

    $state.current.data.resources = { 'dosh': 10 };

    var ctrl = $controller('player.upgrades.Ctrl', {  '$scope': $scope,
                                                      '$state': $state,
                                                      '$stateParams': $stateParams });

    $scope.buy('9mm');

    expect( $state.current.data.resources['dosh'] ).toBe(10 - cost);
  });

  it('should not increment building count if not enough resource', function() {
    var cost = $state.current.data.config.generators['9mm'].base_cost['dosh'];
    $state.current.data.resources = { 'dosh': cost - 1 };

    var ctrl = $controller('player.upgrades.Ctrl', {  '$scope': $scope,
                                                      '$state': $state,
                                                      '$stateParams': $stateParams });

    $scope.buy('9mm');

    expect( $state.current.data.generators['9mm'].count ).toBe(0);
  });

  it('should increase cost after buying', function() {
    $state.current.data.resources = { 'dosh': 10 };

    var ctrl = $controller('player.upgrades.Ctrl', {  '$scope': $scope,
                                                      '$state': $state,
                                                      '$stateParams': $stateParams });


    $scope.buy('9mm');
    expect( $state.current.data.generators['9mm'].costs['dosh'].at ).toBe(2);
  });

  it('should change building property on additive upgrade purchase', function() {
    var ctrl = $controller('player.upgrades.Ctrl', {  '$scope': $scope,
                                                      '$state': $state,
                                                      '$stateParams': $stateParams });

    $scope.buy_upgrade('exp_rounds');
    expect( $state.current.data.generators['m4'].produces['dosh'].at ).toBe(15);
  });

  it('should change building property on multiplicative upgrade purchase', function() {

    $state.current.data.config.upgrades['test'] = {
      cost: 10,
      effect: {
          target: 'm4',
          prop: 'costs',
          resource: 'dosh',
          add: 0,
          mult: 0.5
      }
    };

    var ctrl = $controller('player.upgrades.Ctrl', {  '$scope': $scope,
                                                      '$state': $state,
                                                      '$stateParams': $stateParams });

    $scope.buy_upgrade('test');
    expect( $state.current.data.generators['m4'].costs['dosh'].base ).toBe(50);
    expect( $state.current.data.generators['m4'].costs['dosh'].at ).toBe(25);
  });

  it('shouldn\'t allow buying an upgrade twice', function() {
    $state.current.data.config.generators['test'] = {
      base_cost: { 'dosh': 0 },
      produces: {'dosh': {base: 1, at: 1, add: 0, mult: 1} },
      cost_fn: function(n) { n }
    };

    $state.current.data.config.upgrades['test'] = {
      cost: 0,
      effect: {
        target: 'test',
        prop: 'produces',
        resource: 'dosh',
        add: 0,
        mult: 2
      }
    };

    var ctrl = $controller('player.upgrades.Ctrl', {  '$scope': $scope,
                                                      '$state': $state,
                                                      '$stateParams': $stateParams });

    IGC_initGame($state);
    expect( $state.current.data.generators['test'].produces['dosh'].at ).toBe(1);
    $scope.buy_upgrade('test');
    expect( $state.current.data.generators['test'].produces['dosh'].at ).toBe(2);

    // check hasBought
    expect( $state.current.data.upgrades.hasBought('test') ).toBe(true);

    // try another buy, make sure production hasn't increased
    $scope.buy_upgrade('test');
    expect( $state.current.data.generators['test'].produces['dosh'].at ).toBe(2);
  });
});
