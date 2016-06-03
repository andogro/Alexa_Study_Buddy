(function () {

  'use strict';

angular.module('myApp')
.controller('homeController', function($scope, $http, authService) {
    
    $scope.userData = {};

    //login info

    $scope.authenticated = false;
    $scope.user = JSON.parse(authService.getUserName());
    if($scope.user) {
      $scope.authenticated = true
    }


    // Get all users
    $http.get('/quizzes')
        .success(function(results) {
            $scope.quizData = results.data;
        //     console.log("user side this is the quizdata"+ JSON.stringify($scope.quizData));
         })
        .error(function(error) {
            console.log('Error: ' + JSON.stringify(error));
        });
});

})();
