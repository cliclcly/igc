'use strict;'

describe('Player Controller', function() {

  var $rootScope, $scope, $controller, $injector, $state, $stateParams;

  beforeEach( function() {
    module('playerController');
    module('ui.router');
  });

  beforeEach( inject( function(_$rootScope_, _$controller_, _$injector_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $injector = _$injector_;
    $state = $injector.get('$state');

    $state.current.data = { resources: {'dosh': 0}, buildings: {} };
    $state.current.data.config = test_config;

    $stateParams = $injector.get('$stateParams');
  }));

  it('should increment money on killzed broadcast', function() {
    var ctrl = $controller('player.Ctrl', { '$scope':$scope,
                                            '$state':$state,
                                            'stateParams':$stateParams });

    $scope.$broadcast('killzed', []);

    expect( $state.current.data.resources['dosh'] ).toBe(1);
  });

  it('should increment resource for automatics', function() {
    var ctrl = $controller('player.Ctrl', { '$scope': $scope,
                                            '$state': $state,
                                            '$stateParams': $stateParams });

    // simulate game loop running for 1 second
    $scope.updateGame(1);
    $state.current.data.buildings['9mm'].count++;
    $scope.updateGame(1001);

    expect( $state.current.data.resources['dosh'] ).toBe(1);
  });

  it('should calculate initial base cost', function() {
    var ctrl = $controller('player.Ctrl', { '$scope': $scope,
                                            '$state': $state,
                                            '$stateParams': $stateParams });

    $scope.updateGame(1);
    var base_cost = $state.current.data.config.automatics['9mm'].base_cost;
    var current_cost = $state.current.data.buildings['9mm'].cost;

    expect( base_cost ).toEqual( current_cost );
  });
});
