(function() {
'use strict';

//Filters are used to manipulate input
//https://docs.angularjs.org/api/ng/filter/filter
angular.module('filtersModule', [])

//Takes an array of objects and the name of a key and returns a list of unique values for that key.
//Can be called either in the javascript using $filter or in the html with |
//Example: [{id: 1, name: 'a'},{id: 2, name: 'a'},{id: 3, name: 'b'}] | unique: name
//returns [{id: 1, name: 'a'},{id: 3, name: 'b'}]
.filter('unique', function() {
    return function(input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i][key]] == "undefined"){
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
});


}());
