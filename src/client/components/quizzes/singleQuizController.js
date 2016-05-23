(function () {

  'use strict';

angular.module('myApp')
.controller('singleQuizController', function($scope, $routeParams, crudService) {

    $scope.formData = {};
    $scope.userData = {};
    var currId = $routeParams.id;

    // Get user by ID
        crudService.getUserQuiz(currId)
        .success(function(results) {
            $scope.quizData = results.data;
            console.log("singleQuizController"+ JSON.stringify($scope.quizData));
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
    });

})();


