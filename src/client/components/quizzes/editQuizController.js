(function () {

  'use strict';

angular.module('myApp')
.controller('editQuizController', function($scope, $rootScope, $routeParams, $location, crudService, authService) {

    $rootScope.loggedIn = true;
    $scope.quizchanged = false;
    var quizId = $routeParams.id;
    $scope.formData = {};
    $scope.questions = [];

    function Question (id, question, a1, a2, a3, a4) {
      this.quiz_id = id;
      this.question = question;
      this.a1 = a1;
      this.a2 = a2;
      this.a3 = a3;
      this.a4 = a4
    }

// get information to populate the page
    crudService.getEditQuiz(quizId)
    .success(function(results) {
           $scope.formData.quiz_name = results.data[0].quiz_name;
           $scope.formData.quiz_desc = results.data[0].quiz_desc;
           $scope.formData.quiz_tags = results.data[0].quiz_tags;
           $scope.formData.quiz_id = results.data[0].quiz_id;          
          
          for (var i=0; i<results.data.length; i++) {
          var newQuestion = new Question(results.data[i].quiz_id, results.data[i].question, results.data[i].a1, results.data[i].a2, results.data[i].a3, results.data[i].a4); 
          $scope.questions.push(newQuestion);
          newQuestion = "";
          }
           console.log("Quiz and Questions on front end route"+ JSON.stringify($scope.formData));
           console.log("this is scope.questions"+$scope.questions);
       })
       .error(function(error) {
           console.log('Error: ' + error);
       });

  //add new question will need to hit an insert route     

    $scope.addQ = function() {
     var newQuestion = new Question(quizId, $scope.questionData.question, $scope.questionData.a1, $scope.questionData.a2, $scope.questionData.a3, $scope.questionData.a4); 
     crudService.addQuestion(newQuestion)
         .success(function(data) {
           $scope.questionadded = true;
           $scope.questions.push(newQuestion)
          })
         .error(function(error) {
             console.log('Error: ' + JSON.stringify(error));
         });       
          $scope.questionData = {};
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


//edit question info
  $scope.submitQ = function(question, id) {     
          console.log("this is this question", question)
          console.log("thi is the id", id);
          crudService.editQuestion(question, id)
              .success(function(data) {
                $scope.questionchanged = true;
              })
              .error(function(error) {
                  console.log('Error: ' + JSON.stringify(error));
              });
      };


//edit quiz info
  $scope.submit = function() {     
          crudService.editQuiz($scope.formData, quizId)
              .success(function(data) {
                $scope.quizchanged = true;
              })
              .error(function(error) {
                  console.log('Error: ' + JSON.stringify(error));
              });
      };
    });

})();


