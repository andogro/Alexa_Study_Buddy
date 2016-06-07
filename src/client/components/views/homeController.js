(function () {

  'use strict';

angular.module('myApp')

.controller('homeController', function($scope, $http, authService) {
    
    $scope.nav ={}
    $scope.nav.authenticated=true;
    // Get all users
    $http.get('/quizzes')
        .success(function(results) {
            $scope.quizData = results.data.slice(4);
       })
        .error(function(error) {
            console.log('Error: ' + JSON.stringify(error));
        });
});

})();
