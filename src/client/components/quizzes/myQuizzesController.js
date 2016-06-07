(function () {

  'use strict';

angular.module('myApp')

.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });
      return output;
   };
})

.controller('myQuizzesController', ['$rootScope', '$scope', '$location', 'crudService', 'authService',  function($rootScope, $scope, $location, crudService, authService) {
    
    $scope.user = {};
    $scope.user.name = JSON.parse(authService.getUserName());
    $rootScope.nav = {};
    $rootScope.nav.authenticated = true;

    }]);
      

})();


