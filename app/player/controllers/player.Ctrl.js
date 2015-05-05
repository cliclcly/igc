(function() {
'use strict';

var playerController = angular.module('playerController', []);

playerController.controller('player.Ctrl', ['$scope','$stateParams','$state','$interval',
function($scope,$stateParams,$state,$interval) {
  $scope.money = 0;
  $scope.frameCount = 0;

  $scope.$on('killzed', function(args) {
    $scope.money++;
  });

  var updateGame = function( time ) {
    $scope.frameCount++;
    if(!$scope.$$phase) {
      $scope.$apply();
    }
    window.requestAnimationFrame( updateGame );
  };

  window.requestAnimationFrame( updateGame );

  //Print out frame count every second to the console
  // $interval(function() {
  //   console.log($scope.frameCount);
  // }, 1000);



  //--Test game loop not dependent on $interval timing--
//   var ups = 10;
//   var run = (function() {
//     var loops = 0, skipTicks = 1000 / ups, maxFrameSkip = 10, nextGameTick = (new Date()).getTime();
//
//     return function() {
//       loops = 0;
//
//       while ((new Date()).getTime() > nextGameTick && loops < maxFrameSkip) {
//         updateGame();
//         nextGameTick += skipTicks;
//         loops++;
//       }
//     };
//   })();
//
// $interval(run, 0);


  //--Test game loop dependent on $interval timing--
  // var fps = 10;
  // $interval(updateGame, 1000/10);



  // --Test game loop using animation rate--
  // var onEachFrame;
  // if(window.requestAnimationFrame) {
  //     onEachFrame = function(cb) {
  //       var _cb = function() { cb(); requestAnimationFrame(_cb); };
  //       _cb();
  //     };
  //   }
  //
  //   window.onEachFrame = onEachFrame;
  //
  //   window.onEachFrame(updateGame);
  //

}]);
}());
