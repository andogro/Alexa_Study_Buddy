(function () {

  'use strict';

  angular.module('myApp')
  .service('crudService', crudService);
  crudService.$inject = ['$http'];

    function crudService($http) {
      console.log('here i am');
     return {
      getQuizById: function(currId) {
        return $http.get('/quizzes/'+currId)
        },
      addQuiz: function(data) {
        return $http.post('/quiz/new', data)
       },
      getUserQuiz: function(currId) {
        return $http.get('/singlequiz/'+currId)
      }    
    }
  }
})();