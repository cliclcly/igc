var uniqueName = angular.module('uniqueName', []);

uniqueName.directive('nameUnique', ["$timeout", "$state", function($timeout, $state) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
       var stop_timeout;
       return scope.$watch(function() {
          return ngModel.$modelValue;
       }, function(name) {
          $timeout.cancel(stop_timeout);
          if (!name) {
            return ngModel.$setValidity('unique', true);
          }


          stop_timeout = $timeout(function() {
            if(attrs.nameUnique === "resource") {
              for(var x = 0; x < $state.current.data.creator.resources.length; x++) {
                if($state.current.data.creator.resources[x].name === name) {
                  return ngModel.$setValidity('unique', false);
                }
              }
            }
            return ngModel.$setValidity('unique', true);
          }, 200);


       });

       }



  };
}]);
