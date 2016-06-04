(function () {

  'use strict';

angular.module('myApp')

.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
})


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
            $scope.quizData = results.data.slice(4);
         console.log("user side this is the quizdata"+ JSON.stringify($scope.quizData));
         })
        .error(function(error) {
            console.log('Error: ' + JSON.stringify(error));
        });
});

})();
