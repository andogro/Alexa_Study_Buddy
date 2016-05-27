(function () {

  'use strict';

angular.module('myApp')
.controller('newQuizzesController', function($scope, $rootScope, $routeParams, crudService, authService) {

    $scope.formData = {};
    $rootScope.user = {};
    $rootScope.loggedIn = true;
    $rootScope.user.id = JSON.parse(authService.getUserID());

    var memberId = authService.getUserID();
    var token = authService.getUserToken();


     $scope.submit = function() {     
          console.log("this is what will be submitted" + $scope.formData);
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


