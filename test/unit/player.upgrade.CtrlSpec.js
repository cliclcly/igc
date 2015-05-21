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
  }));

  it('should increment building on buy', function() {
    $state.current.data.resources = { 'dosh': 10 };
    $state.current.data.buildings = { '9mm': 0 };

    var ctrl = $controller('player.upgrades.Ctrl', {  '$scope': $scope,
                                                      '$state': $state,
                                                      '$stateParams': $stateParams });

    $scope.buy('9mm');

    expect($state.current.data.buildings['9mm'].count).toBe(1);
  });

  it('should decrement dosh on buy', function() {
    var cost = 2;

    $state.current.data.resources = { 'dosh': 10 };
    $state.current.data.buildings = { '9mm': {
                                        count: 0,
                                        cost: cost
                                      }
                                    };

    var ctrl = $controller('player.upgrades.Ctrl', {  '$scope': $scope,
                                                      '$state': $state,
                                                      '$stateParams': $stateParams });

    $scope.buy('9mm');

    expect( $state.current.data.resources['dosh'] ).toBe(10 - cost);
  });

  it('should not increment building count if not enough resource', function() {
    $state.current.data.resources = { 'dosh': 3 };
    $state.current.data.buildings = { '9mm': {
                                        count: 0,
                                        cost: 5
                                      }
                                    };

    var ctrl = $controller('player.upgrades.Ctrl', {  '$scope': $scope,
                                                      '$state': $state,
                                                      '$stateParams': $stateParams });

    $scope.buy('9mm');

    expect( $state.current.data.buildings['9mm'].count ).toBe(0);
  });

  it('should increase cost after buying', function() {
    $state.current.data.resources = { 'dosh': 10 };
    $state.current.data.buildings = { '9mm' : {
                                        count: 0,
                                        cost: 1 }};

    var ctrl = $controller('player.upgrades.Ctrl', { '$scope': $scope,
                                            '$state': $state,
                                            '$stateParams': $stateParams });


    $scope.buy('9mm');
    expect( $state.current.data.buildings['9mm'].cost).toBe(2);
  });

  it('should change building property on additive upgrade purchase', function() {
    $state.current.data.buildings = { 'm4': {
                                        count: 1,
                                        cost: {},
                                        produces: {
                                          'dosh': {base: 10, at: 10, add: 0, mult: 1}
                                        }
                                      }
                                    };

    var ctrl = $controller('player.upgrades.Ctrl', {  '$scope': $scope,
                                                      '$state': $state,
                                                      '$stateParams': $stateParams });

    $scope.buy_upgrade('exp_rounds');
    expect( $state.current.data.buildings['m4'].produces['dosh'].at ).toBe(15);
  });

  it('should change building property on multiplicative upgrade purchase', function() {
    $state.current.data.buildings = {
      'm4': {
        count: 1,
        costs: {
          'dosh': {base: 10, at: 10, add: 0, mult: 1}
        }
      }
    };

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
    expect( $state.current.data.buildings['m4'].costs['dosh'].base ).toBe(10);
    expect( $state.current.data.buildings['m4'].costs['dosh'].at ).toBe(5);
  });
});
