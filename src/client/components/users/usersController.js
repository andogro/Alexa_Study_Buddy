(function () {

  'use strict';

angular.module('myApp')
.controller('usersController', function($scope, $http) {
    
    $scope.userData = {};

    // Get all users
    $http.get('/users')
        .success(function(results) {
            $scope.userData = results.data;
        })
        .error(function(error) {
            console.log('Error: ' + error);  // handle errors on page
        });
    });

})();

