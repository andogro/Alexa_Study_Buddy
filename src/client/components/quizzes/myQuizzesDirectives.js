(function () {

  'use strict';

  angular.module('myApp').directive('quizList', function () {
    return {
        restrict: 'E',
        scope: {},
        template: '<div class="grid-items"><a href="#/quiz/edit/{{item.quiz_id}}" class="grid-item" ng-repeat="item in vm.quizData | unique : \'quiz_name\' ">'
        +'<h1>{{item.quiz_id}}</h1> '
        +'<h1>{{item.quiz_name}}</h1> '
        +'<p> {{item.quiz_desc}}<br> '
        +'tags: {{item.quiz_tags}}<br> '
        // +'by:  {{item.fname}}<br> '
        +'added: {{item.created | date}}</p></a></div>',
        controller: myController,
        controllerAs: 'vm',
        bindToController: true
    }
  });

  myController.$inject = ['crudService', 'authService']

  function myController(crudService, authService) {
    var vm = this;
    var userId = authService.getUserID();

    crudService.getUserQuizzes(userId)
     .success(function(results) {
        vm.quizData = results.data;
      })
      .error(function(error) {
        console.log('Error: ' + error);
      });
  }
})();