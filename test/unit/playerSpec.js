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
    $state.current.data = { money: 0 };
    $stateParams = $injector.get('$stateParams');
  }));

  it('should increment money on killzed broadcast', function() {
    var ctrl = $controller('player.Ctrl', { '$scope':$scope,
                                            '$state':$state,
                                            'stateParams':$stateParams });

    $scope.$broadcast('killzed', []);

    expect( $state.current.data.money ).toBe(1);
  });
});
