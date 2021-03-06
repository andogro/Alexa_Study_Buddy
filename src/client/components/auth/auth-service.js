(function () {

  'use strict';

  angular.module('myApp')
    .service('authService', authService);

  authService.$inject = ['$http', '$window', '$rootScope'];


  function authService($http, $window, $rootScope) {
    var user = {};
    return {
      login: function(user) {
        return $http.post('/login', user);
      },
      logout: function(user) {
        user = null;
        $window.localStorage.clear();
      },
      register: function(user) {
       return $http.post('/register', user);
      },
      setUserInfo: function(userData) {
        $window.localStorage.setItem('user', JSON.stringify(userData.data.user));
        $window.localStorage.setItem('token', JSON.stringify(userData.data.token));
        $window.localStorage.setItem('user_id', JSON.stringify(userData.data.user_id));
        $window.localStorage.setItem('active', true);
      },
      edit: function(user) {
       return $http.post('/edit'+'', user)
      },
      getUserName: function() {
        return $window.localStorage.getItem('user');
      },
      getActiveUser: function() {
        return $window.localStorage.getItem('active');
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