(function () {

  'use strict';

  angular.module('myApp')
    .service('authService', authService);

  authService.$inject = ['$http', '$window'];


  function authService($http, $window) {
    var user = {};
    return {
      login: function(user) {
        console.log("this is login user"+JSON.stringify(user));
        return $http.post('/login', user);
      },
      logout: function(user) {
        user = null;
        $window.localStorage.clear();
      },
      register: function(user) {
        console.log("this is user in register function from authservice"+JSON.stringify(user));
        return $http.post('/register', user);
      },
      setUserInfo: function(userData) {
        $window.localStorage.setItem('user', JSON.stringify(userData.data.fname));
        $window.localStorage.setItem('token', JSON.stringify(userData.data.token));
        $window.localStorage.setItem('user_id', JSON.stringify(userData.data.user_id));
      },
      edit: function(user) {
       console.log("this is edit route"+user);
       return $http.post('/edit'+'', user)
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