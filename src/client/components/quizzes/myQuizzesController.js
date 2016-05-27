(function () {

  'use strict';

angular.module('myApp')
.controller('myQuizzesController', function($rootScope, $scope, $location, crudService, authService) {

    $rootScope.user = {};
    $rootScope.loggedIn = true;
    $rootScope.user.name = JSON.parse(authService.getUserName());

    var memberId = authService.getUserID();
    var token = authService.getUserToken();

   $scope.formData = {};
     $scope.submit = function() {     
          console.log($scope.formData);
          crudService.addQuiz($scope.formData)
              .success(function(data) {
                  $scope.formData = {};
                  console.log(data);
              })
              .error(function(error) {
                  console.log('Error: ' + JSON.stringify(error));
              });
      };
      
    });

})();


