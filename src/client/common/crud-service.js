(function () {

  'use strict';

  angular.module('myApp')
  .service('crudService', crudService);
  crudService.$inject = ['$http'];

    function crudService($http) {
     return {
      getQuizById: function(currId) {
        return $http.get('singlequiz/'+currId)
        },
      addQuiz: function(quiz,questions) {
        return $http.post('/quiz/new', {
            quiz: quiz,
            questions: questions
          })
       },
       addQuestion: function(question) {
         return $http.post('/question/new', {
             question: question
           })
        },
      getUserQuiz: function(currId) {
        return $http.get('/singlequiz/'+currId)
      },
      getAllQuizzes: function() {
        return $http.get('/quizzes')
      },
      getUserQuizzes: function (userId) {
        return $http.get('/quizzes/' + userId)
      },
      getEditQuiz: function (quizId) {
        return $http.get('/quiz/edit/' + quizId)
      },
      editQuiz: function (quiz,id) {
        return $http.post('/quiz/edit/' + id, {
          quiz: quiz
        })
      },
      editQuestion: function (question,id) {
        return $http.post('/question/edit/' + id, {
          question: question
        })
      },
      deleteQuiz: function (id) {
        return $http.post('/quiz/delete/' + id)
      },
      deleteQuestion: function (id) {
        return $http.post('/question/delete/' + id)
      },
    }
  }

})();