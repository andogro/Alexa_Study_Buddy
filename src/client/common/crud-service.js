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
      getUserQuiz: function(currId) {
        return $http.get('/singlequiz/'+currId)
      },
      getAllQuizzes: function() {
        return $http.get('/quizzes')
      },
      getUserQuizzes: function (userId) {
        return $http.get('/quizzes/' + userId)
      },
    }
  }

})();