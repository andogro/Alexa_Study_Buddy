(function () {

  'use strict';

  angular.module('myApp')
    .service('authService', authService);

  authService.$inject = ['$http', '$window'];


  function authService($http, $window) {
    var user = {};
    return {
      login: function(user) {
        return $http.post('/users/login', user);
      },
      logout: function(user) {
        user = null;
        $window.localStorage.clear();
      },
      register: function(user) {
        return $http.post('/users/register', user);
      },
      setUserInfo: function(userData) {
        $window.localStorage.setItem('user', JSON.stringify(userData.data.username));
        $window.localStorage.setItem('token', JSON.stringify(userData.data.token));
        $window.localStorage.setItem('user_id', JSON.stringify(userData.data.user_id));
      },
      getUserName: function() {
        return $window.localStorage.getItem('user');
      },
      getUserToken: function() {
        var token = $window.localStorage.getItem('token');
        return token;
      },
      getUserID: function() {
        return $window.localStorage.getItem('user_id');
      }
    };
  }

})();