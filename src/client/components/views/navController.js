(function () {

  'use strict';

angular.module('myApp')
.controller('navController', ['$scope', '$rootScope' , '$http', "authService" , "crudService", function($scope, $rootScope, $http, authService, crudService) {
    
    $scope.user = {};
    $scope.user.name = JSON.parse(authService.getUserName());

    $scope.logout = function(){
      authService.logout($scope.user.name);
      $scope.user = JSON.parse(authService.getUserName());            
      console.log('user after logout', $scope.user.name);
    }

  }]);

})();
