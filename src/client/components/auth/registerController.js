(function () {

  'use strict';

  angular.module('myApp')
    .controller('registerController', registerController);

  registerController.$inject = ['$rootScope', '$scope', '$location', 'authService'];

  function registerController($rootScope, $scope, $location, authService) {
    $scope.user = {};
    $scope.register = function() {
      authService.register($scope.user)
        .then(function(user) {
          console.log("this is registration info returned as user", user)
          authService.setUserInfo(user);
          $location.path('/quiz/new');
          $scope.currentUser = {
            name: authService.getUserName(),
            id: authService.getUserID()
          };
        })
        .catch(function(err) {
          $scope.error = err.data.message; 
        });
    };
  }

})();