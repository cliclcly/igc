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

    $state.current.data = {};
    $state.current.data.config = test_config;

    $stateParams = $injector.get('$stateParams');
  }));

  it('should initialize resources', function() {
    var ctrl = $controller('player.Ctrl', { '$scope': $scope,
                                            '$state': $state,
                                            '$stateParams': $stateParams });

    for (var res in $state.current.data.config.resources) {
      if ($state.current.data.config.resources.hasOwnProperty(res)) {
        expect( $state.current.data.resources[res] ).toBeDefined();
        expect( $state.current.data.resources[res] ).toBe( 0 );
      }
    }
  });

  it('should increment money on killzed broadcast', function() {
    var ctrl = $controller('player.Ctrl', { '$scope': $scope,
                                            '$state': $state,
                                            '$stateParams': $stateParams });

    $scope.updateGame(1);
    $scope.$broadcast('killzed', []);

    expect( $state.current.data.resources['dosh'] ).toBe(1);
  });

  it('should increment resource for automatics', function() {
    var ctrl = $controller('player.Ctrl', { '$scope': $scope,
                                            '$state': $state,
                                            '$stateParams': $stateParams });

    // simulate game loop running for 1 second
    $scope.updateGame(1);
    $state.current.data.generators['9mm'].count++;
    $scope.updateGame(1001);

    expect( $state.current.data.resources['dosh'] ).toBe(1);
    expect( $state.current.data.resources['goresword'] ).toBe( 0 );
  });

  it('should calculate initial base cost', function() {
    var ctrl = $controller('player.Ctrl', { '$scope': $scope,
                                            '$state': $state,
                                            '$stateParams': $stateParams });

    $scope.updateGame(1);
    var base_cost = $state.current.data.config.generators['9mm'].base_cost['dosh'];
    var current_cost = $state.current.data.generators['9mm'].costs['dosh'].at;

    expect( base_cost ).toEqual( current_cost );
  });
});
