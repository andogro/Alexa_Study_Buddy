(function () {

  'use strict';

  angular.module('myApp')
    .controller('registerController', registerController);

  registerController.$inject = ['$rootScope', '$scope', '$location', 'authService'];

  function registerController($rootScope, $scope, $location, authService) {
    $scope.user = {};
    $scope.register = function() {
      console.log('this is scope user'+ $scope.user);
      // $scope.user.slug = $scope.user.username;
      // debugger;
      authService.register($scope.user)
        .then(function(user) {
          console.log("this is register controller"+ JSON.stringify(user));
          authService.setUserInfo(user);
          $location.path('/quiz/new');
          $rootScope.currentUser = authService.getUserInfo();
        })
        .catch(function(err) {
          // check status code, send message
          console.log(err);
        });
    };
  }

})();