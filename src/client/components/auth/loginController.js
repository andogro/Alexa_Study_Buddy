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
          console.log("this is user info to set in auth" + user);
          authService.setUserInfo(user);
          //redirect user to quizzes on login
          $location.path('/myquizzes');
          $rootScope.currentUser = {
            name: authService.getUserName(),
            id: authService.getUserID()
          };
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  }

})();