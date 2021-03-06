(function () {

  'use strict';

  angular.module('myApp')
    .config(appConfig)
    .run(routeChange);

  appConfig.$inject = ['$routeProvider', '$httpProvider',];
  routeChange.$inject = ['$rootScope', '$location', '$window', 'authService'];


  function appConfig($routeProvider, $httpProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '../components/views/home.html',
      controller: 'homeController',
      restricted: false,
      preventLoggedIn: false
    })
    .when('/users', {
      templateUrl: '../components/users/usersindex.html',
      controller: 'usersController',
      restricted: false,
      preventLoggedIn: false
    })
    .when('/about', {
      templateUrl: '../components/views/about.html',
      controller: 'homeController',
      restricted: false,
      preventLoggedIn: false
    })
    .when('/quizzes/:id',{
      templateUrl: '../components/quizzes/quizindex.html',
      controller: 'quizzesController',
      restricted: false,
      preventLoggedIn: false
    })
    .when('/quizzes',{
      templateUrl: '../components/quizzes/quizindex.html',
      controller: 'quizzesController',
      restricted: false,
      preventLoggedIn: false
    })
    .when('/quiz/new', {
      templateUrl: '../components/quizzes/addnewquiz.html',
      controller: 'newQuizzesController',
      restricted: true,
      preventLoggedIn: false
    })
    .when('/singlequiz/:id',{
      templateUrl: '../components/quizzes/singlequiz.html',
      controller: 'singleQuizController',
      restricted: false,
      preventLoggedIn: false
    })    
    .when('/login', {
      templateUrl: '../components/auth/login.html',
      controller: 'loginController',
      restricted: false,
      preventLoggedIn: true
    })
    .when('/register', {
      templateUrl: '../components/auth/register.html',
      controller: 'registerController',
      restricted: false,
      preventLoggedIn: true
    })
    .when('/myquizzes', {
      templateUrl: '../components/quizzes/myquizzes.html',
      controller: 'myQuizzesController',
      restricted: true,
      preventLoggedIn: false
    })
    .when('/quiz/edit/:id', {
      templateUrl: '../components/quizzes/editquiz.html',
      controller: 'editQuizController',
      restricted: true,
      preventLoggedIn: false
    })
     .when('/logout', {
      restricted: false,
      preventLoggedIn: false,
      resolve: {
        test: function(authService, $rootScope, $location) {
          authService.logout();
          $rootScope.currentUser = authService.getUserName();
          $location.path('/');
        }
      }
    })
    .otherwise({redirectTo: '/login'});
    $httpProvider.interceptors.push('authInterceptor');
  }

  function routeChange($rootScope, $location, $window, authService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      // if route us restricted and no token is present
      if(next.restricted && !$window.localStorage.getItem('token')) {
        $location.path('/');
      }
      // if token and prevent logging in is true
      if(next.preventLoggedIn && $window.localStorage.getItem('token')) {;
        $location.path('/myquizzes');
      }
    });
  }

})();