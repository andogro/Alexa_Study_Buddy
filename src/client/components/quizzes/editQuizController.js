(function () {

  'use strict';


angular.module('myApp')
.controller('editQuizController',  ['$scope', '$rootScope', '$routeParams', '$location', 'crudService', 'authService', '$timeout', function($scope, $rootScope, $routeParams, $location, crudService, authService, $timeout) {

    $scope.user = {};
    $scope.user.name = JSON.parse(authService.getUserName());
    $rootScope.nav = {};
    $rootScope.nav.authenticated = true;
   
    $scope.quizchanged = false;
    var quizId = $routeParams.id;
    $scope.formData = {};
    $scope.questions = [];

    function Question (id, question, a1, a2, a3, a4) {
      this.quest_id = id;
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
        var newQuestion = new Question(results.data[i].quest_id, results.data[i].question, results.data[i].a1, results.data[i].a2, results.data[i].a3, results.data[i].a4); 
        $scope.questions.push(newQuestion);
        newQuestion = "";
        }
      })
       .error(function(error) {
           console.log('Error: ' + error);
      });

  //add new question     

      $scope.addQ = function() {
        var addNewQ = {
          quiz_id: quizId,
          question: $scope.questionData.question,
          a1: $scope.questionData.a1,
          a2: $scope.questionData.a2,
          a3: $scope.questionData.a3,
          a4: $scope.questionData.a4
       }
        crudService.addQuestion(addNewQ)
           .success(function(data) {
             $scope.questionadded = true;
               var questID = data["data"][0]["quest_id"];
               var newQuestion = new Question(questID, data["data"][0]["question"], data["data"][0]["a1"], data["data"][0]["a2"], data["data"][0]["a3"], data["data"][0]["a4"]); 
               $scope.questions.push(newQuestion);
          })
           .error(function(error) {
               console.log('Error: ' + JSON.stringify(error));
           });       
            $scope.questionData = {};
      };

  //remove question 
      $scope.removeQuestion = function(id,index) {
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

 //update alert Quiz
     $scope.updated = false;
     $scope.updateButton = function(){
        $scope.updated = true;
        $timeout(function () {
          $scope.updated = false; }, 2000);
    };

 //add alert Question
     $scope.updatedq = false;
     $scope.updateButtonQ = function(){
        $scope.updatedq = true;
        $timeout(function () {
          $scope.updatedq = false; }, 2000);
    };
 //update alert Question
     $scope.updatedquest = false;
     $scope.updateButtonQuest = function(){
        $scope.updatedquest = true;
        $timeout(function () {
          $scope.updatedquest = false; }, 2000);
    };


//edit question info
      $scope.submitQ = function(question, id) {     
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
      
    }]);

})();


