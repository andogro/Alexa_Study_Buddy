(function () {

  'use strict';

  angular.module('myApp')
    .controller('loginController', loginController);

  loginController.$inject = ['$rootScope', '$scope', '$location', 'authService'];

  function loginController($rootScope, $scope, $location, authService) {
    $scope.user = {};
    $scope.user.email = "andy@andy.com"; //this is for demo purposes, 
    $scope.user.password = "andy";       // delete when app is ready.

    $scope.login = function() {
      authService.login($scope.user)
        .then(function(user) {
          authService.setUserInfo(user);
          $rootScope.nav = {};
          $rootScope.nav.authenticated = true;
          //redirect user to quizzes on login
          $location.path('/myquizzes');
          $rootScope.currentUser = {
            name: authService.getUserName(),
            id: authService.getUserID()
          };
        })
        .catch(function(err) {
          $scope.error = err.data.message; 
          console.log($scope.error);
        });
    };

}

})();