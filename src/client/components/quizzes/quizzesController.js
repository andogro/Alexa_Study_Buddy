(function () {

  'use strict';

angular.module('myApp')

.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });
      return output;
   };
})

.controller('quizzesController', ['$scope', '$routeParams', 'crudService', function($scope, $routeParams, crudService) {
    $scope.formData = {};
    $scope.userData = {};
    var currId = $routeParams.id;

     crudService.getQuizById(currId)
        .success(function(results) {
            $scope.quizData = results.data;
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
    }]);

})();


