(function () {

  'use strict';

angular.module('myApp')
.controller('homeController', function($scope, $http) {
    
    $scope.userData = {};

    // Get all users
    $http.get('/quizzes')
        .success(function(results) {
            $scope.quizData = results.data;
            console.log("user side this is the quizdata"+ $scope.quizData);
        })
        .error(function(error) {
            console.log('Error: ' + JSON.stringify(error));
        });
});

})();
