(function () {

  'use strict';

angular.module('myApp')
.controller('navController', ['$scope', '$rootScope' , '$http', "authService" , function($scope, $rootScope, $http, authService) {
     

    $scope.authenticated = false;
    $scope.user.name = JSON.parse(authService.getUserName());
    
    $scope.authenticated = JSON.parse(authService.getActiveUser());
       

    console.log("User name from nav controller)", $scope.user.name);

    console.log("Authenticated from nav controller)", $scope.authenticated);
    

    $scope.logout = function(){
      authService.logout($scope.user.name);
      $scope.user = JSON.parse(authService.getUserName());            
      console.log('user after logout', $scope.user.name);
    }

  }]);

})();
