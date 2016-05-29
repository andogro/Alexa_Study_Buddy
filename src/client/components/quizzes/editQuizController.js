(function () {

  'use strict';

angular.module('myApp')
.controller('editQuizController', function($scope, $rootScope, $routeParams, $location, crudService, authService) {

    var quizId = $routeParams.id;
    $scope.formData = {};
    $scope.questions = [];

    function Question (quest_id, question, a1, a2, a3, a4) {
      this.quest_id = quest_id;
      this.question = question;
      this.a1 = a1;
      this.a2 = a2;
      this.a3 = a3;
      this.a4 = a4
    }


    crudService.getEditQuiz(quizId)
    .success(function(results) {
           $scope.formData.quiz_name = results.data[0].quiz_name;
           $scope.formData.quiz_desc = results.data[0].quiz_desc;
           $scope.formData.quiz_tags = results.data[0].quiz_tags;
           $scope.formData.quiz_id = results.data[0].quiz_id;
          
          for (var i=0; i<results.data.length; i++) {
          var newQuestion = new Question(results.data[i].quest_id, results.data[i].question, results.data[i].a1, results.data[i].a2, results.data[i].a3, results.data[i].a4); 
          $scope.questions.push(newQuestion);
          newQuestion = "";
          }

           console.log("Quiz and Questions on front end route"+ JSON.stringify($scope.quizData));
           console.log("this is scope.questions"+$scope.questions);
       })
       .error(function(error) {
           console.log('Error: ' + error);
       });

  //add new question will need to hit an insert route     

    $scope.addNewQuestion = function() {
     var newQuestion = new Question($scope.questionData.question, $scope.questionData.a1, $scope.questionData.a2, $scope.questionData.a3, $scope.questionData.a4); 
     $scope.questions.push(newQuestion);
     $scope.questionData = {};
     $scope.CQ++;
   };

  //remove question 
    $scope.removeQuestion = function(id,index) {
      console.log("this is id" + id)
      $scope.questions.splice(index,1);
        crudService.deleteQuestion(id)
    };

  //delete quiz 
    $scope.deleteQuiz = function(id) {
      crudService.deleteQuiz(id)
        .success(function(data) {
          $location.path('/myquizzes');
           })
        .error(function(error) {
              console.log('Error: ' + JSON.stringify(error));
          });
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
      
    });

})();


