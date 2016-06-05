var knex = require('../../../db/knex');
var Users = function() { return knex('users');};
var Quizzes = function() {return knex('quizzes');};
var Questions = function() {return knex('questions');};


module.exports = {
    login: function(email,password){
        return Users().where('email', email)
        .then(function(data) {
          return data;
        });//end function
       }//end login 
    }; //end module.exports  