(function () {

  'use strict';

  angular.module('myApp')
    .controller('loginController', loginController);

  loginController.$inject = ['$rootScope', '$scope', '$location', 'authService'];

  function loginController($rootScope, $scope, $location, authService) {
    $scope.user = {};
    $scope.login = function() {
      authService.login($scope.user)
        .then(function(user) {
          authService.setUserInfo(user);
          //redirect user to quizzes on login
          $scope.authenticated = true;
          $location.path('/myquizzes');
          $scope.currentUser = {
            name: authService.getUserName(),
            id: authService.getUserID()
          };
        })
        .catch(function(err) {
          console.log(err);
        });
    };

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
        // check status code, send message
        console.log(err);
      });
  };
}

})();