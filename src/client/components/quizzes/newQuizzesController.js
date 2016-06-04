(function () {

  'use strict';

angular.module('myApp')
.controller('newQuizzesController', ['$scope', '$rootScope', '$routeParams', '$location', 'crudService', 'authService', function($scope, $rootScope, $routeParams, $location, crudService, authService) {
  
    $rootScope.nav = {};
    $rootScope.nav.authenticated = true;

    $scope.formData = {};
    $scope.user = {};
    $scope.questionData = {};
    $scope.formData.user_id = JSON.parse(authService.getUserID());
    $scope.CQ = 0;
    $scope.quiz = {};
    $scope.questions = [];
    $scope.user.name = JSON.parse(authService.getUserName());

    function Question (question, a1, a2, a3, a4) {
      this.question = question;
      this.a1 = a1;
      this.a2 = a2;
      this.a3 = a3;
      this.a4 = a4
    }

  $scope.addNewQuestion = function() {
   // var newItemNo = $scope.questions.length+1;
   var newQuestion = new Question($scope.questionData.question, $scope.questionData.a1, $scope.questionData.a2, $scope.questionData.a3, $scope.questionData.a4); 
   $scope.questions.push(newQuestion);
   $scope.questionData = {};
   $scope.CQ++;
 };
    
  $scope.removeQuestion = function(index) {
    $scope.questions.splice(index,1);
  };


  $scope.submit = function() {     
    var newItemNo = $scope.questions.length+1;
    var newQuestion = new Question($scope.questionData.question, $scope.questionData.a1, $scope.questionData.a2, $scope.questionData.a3, $scope.questionData.a4); 
       $scope.questions.push(newQuestion);
          crudService.addQuiz($scope.formData, $scope.questions)
              .success(function(data) {
                  $scope.formData = {};
                  $scope.questiondata = {};
                  $location.path('/myquizzes');
              })
              .error(function(error) {
                  console.log('Error: ' + JSON.stringify(error));
              });
      };
      
    }]);

})();


