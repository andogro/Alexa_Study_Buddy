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

.controller('myQuizzesController', ['$rootScope', '$scope', '$location', 'crudService', 'authService', function($rootScope, $scope, $location, crudService, authService) {

    $scope.user = {};
    $scope.authenticated = true;
    // console.log(JSON.parse(authService.getUserName())); 
    $scope.user.name = JSON.parse(authService.getUserName());
    var userId = authService.getUserID();
 
    $scope.formData = {};
    $scope.userData = {};

    //  crudService.getUserQuizzes(userId)
    //  .success(function(results) {
    //         $scope.quizData = results.data;
    //         console.log("quiz it out"+ JSON.stringify($scope.quizData));
    //     })
    //     .error(function(error) {
    //         console.log('Error: ' + error);
    //     });
    }]);
      

})();


