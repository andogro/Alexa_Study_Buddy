(function () {

  'use strict';

angular.module('myApp')
.controller('myQuizzesController', function($rootScope, $scope, $location, crudService, authService) {

    $rootScope.user = {};
    $rootScope.loggedIn = true;
    $rootScope.user.name = JSON.parse(authService.getUserName());
    var userId = authService.getUserID();
      
    console.log(userId);
    $scope.formData = {};
    $scope.userData = {};

     crudService.getUserQuizzes(userId)
     .success(function(results) {
            $scope.quizData = results.data;
            console.log("quiz it out"+ JSON.stringify($scope.quizData));
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
    });
      

})();


