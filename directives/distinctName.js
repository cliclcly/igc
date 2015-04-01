var uniqueName = angular.module('uniqueName', []);

//Directives are attached to DOM elements that gives it custom behaviors
//https://docs.angularjs.org/guide/directive

//Checks to see if the modeled value already exists in an array, creates and sets a custom validity field called 'unique'
uniqueName.directive('nameUnique', ["$timeout", "$state", function($timeout, $state) {
  return {
    restrict: 'A', //How the directive can be referenced, any combination of A - attribute name <img name-unique>, E - element name <name-unique>, C - class name <img class="name-unique">
    require: 'ngModel', //look for this directive within the same html element
    link: function(scope, element, attrs, ngModel) { //Used when we want to manipulate the DOM, gives us access to the current scope, the html element, and all the attributes of the html element
      //This timeout is used to limit how often the code actually gets run.
      //Otherwise if the user types fast it could slow down the program because this gets called on every character change
       var stop_timeout;

       //Determines if the given name already exists in the array
       var checkValidity = function(name) {
         //cancel the timeout because the user typed another character
          $timeout.cancel(stop_timeout);
          if (!name) {
            //If there is no value, then set the unique form validity to true
            return ngModel.$setValidity('unique', true);
          }

          //Create a new timeout to run after x milliseconds if not canceled
          stop_timeout = $timeout(function() {
            //Get the attribute value for the directive which we are using to determine which array/key-name to check against
            if(attrs.nameUnique === "resource") {
              for(var x = 0; x < $state.current.data.creator.resources.length; x++) {
                if($state.current.data.creator.resources[x].name === name) {
                  //Name already exists in array, set unique form validity to false
                  return ngModel.$setValidity('unique', false);
                }
              }
            }
            //Name not in array, set unique form validity to true
            return ngModel.$setValidity('unique', true);
          }, 200);


       };

       //If this message is received and it is the matching type, check validity again
       scope.$on('distinctName', function(event, type) {
         if(type === attrs.nameUnique) {
           checkValidity(ngModel.$modelValue);
         }
       });

       //Automatically watch the model value and check validity if it has changed
       return scope.$watch(function() {
          return ngModel.$modelValue;
       }, checkValidity);


       }



  };
}]);
