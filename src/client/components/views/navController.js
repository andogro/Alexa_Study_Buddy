(function () {

  'use strict';

angular.module('myApp')
.controller('navController', function($scope, $http, authService) {
     
   // $scope.loggedin = {loggedIn: false};
   //  if ($scope.user = null) {
   //    scope.loggedin.loggedIn = true;
    
    // $scope.authenticated = false;

    $scope.user = JSON.parse(authService.getUserName());

    if(!$scope.user) {
       $scope.authenticated = false;
    }

    if($scope.user) {
      $scope.authenticated = true
    }

    $scope.logout = function(){
      authService.logout($scope.user);
      $scope.user = JSON.parse(authService.getUserName());            
      console.log('user after logout', $scope.user);
    }

        });

})();
