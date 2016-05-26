(function () {

  'use strict';

angular.module('myApp')
.controller('myQuizzesController', function($scope, $routeParams, crudService) {

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


