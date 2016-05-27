var knex = require('../../../db/knex');
var Users = function() { return knex('users');};
var Quizzes = function() {return knex('quizzes');};
var Questions = function() {return knex('questions');};

module.exports = {
    getAllUserPage: function(){
        return Users()
        .then(function(results) {
            return results;
        });
    },
    getAllQuizzes: function(){
        return Quizzes()
        .then(function(results) {
            return results;
        });
    },
    getAllQuestions: function(){
        return Questions()
        .then(function(results) {
            return results;
        });
    },
    getUserQuizzes: function(id){
        return Quizzes().join('questions', 'quizzes.quiz_id', '=', 'questions.quiz_id')
        .where('quizzes.user_id',id)
        .then(function(results) {
            console.log("user quiz results"+ JSON.stringify(results));
            return results;
        });
    },
    getQuizById: function(id){
        return Quizzes().join('questions', 'quizzes.quiz_id', '=', 'questions.quiz_id')
        .where('quizzes.quiz_id',id)
        .then(function(results) {
            console.log("one quiz results"+JSON.stringify(results));
            return results;
        });
    },
    addQuiz: function(info){
        console.log("this is first query"+info)
        return Quizzes().insert({
            quiz_name: info.quizname,
            quiz_desc: info.quizdesc,
            user_id: info.user_id
        })
        .then(function() {
            return Quizzes()
            .then(function(results) {
            console.log("Quiz results"+JSON.stringify(results));
            var lastQuiz = results.pop();
            var quiz_id = lastQuiz.quiz_id;
            return Questions().insert({
              quiz_id: quiz_id,
              question: info.question,
              a1: info.a1,
              a2: info.a2,
              a3: info.a3,
              a4: info.a4
          })    
         })
       })   
      },

    // !Routes to be added
    // addQuestion: function(deck_id,question,answer,q_img,a_img){
    //       return Cards().insert({
    //           deck_id: deck_id
    //           // question: question,
    //           answer: answer,
    //           q_img: q_img,
    //           a_img: a_img,
    //       })
    //       .then(function(results) {
    //           return results;
    //       });
    //     }, 

    // addUser: function(fname,lname,email,password,img,bio){
    //     return Users().insert({
    //         fname: fname,
    //         lname: lname,
    //         email: email,
    //         password: password,
    //         u_img: img,
    //         bio: bio
    //     })
    //     .then(function(results) {
    //         return results;
    //     });
    // },
    // editUser: function(id,fname,lname,email,password,img,bio) {
    //     return Users().where('u_id',id).update({
    //         fname: fname,
    //         lname: lname,
    //         email: email,
    //         password: password,
    //         u_img: img,
    //         bio: bio
    //     })
    //     .then(function(results) {
    //         return results;
    //     }); 
    // },
    // deleteUser: function(id) {
    //   return Users().where('u_id', id).del().then(function(results) {
    //       return results;
    //     });
    //  }

};
