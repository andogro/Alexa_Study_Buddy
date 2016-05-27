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
      addQuiz: function(data) {
        return $http.post('/quiz/new', data)
       },
      getUserQuiz: function(currId) {
        return $http.get('/singlequiz/'+currId)
      },
      getAllQuizzes: function() {
        return $http.get('/quizzes')
      },
      getQuizByUser: function (user_id, token) {
        return $http.get('/quizbyuser/' + user_id, {
            headers: {
              'x-access-token': token
            }
          })
          .then(function(res){
            return res;
          })
          .catch(function(err){
            return err;
          });
      },
    }
  }
})();