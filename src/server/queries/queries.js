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
        return Quizzes().join('users', 'quizzes.user_id', '=', 'users.u_id')
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
    addQuiz: function(quiz, questions){
        console.log("this is quiz query"+ JSON.stringify(quiz))
        console.log("this is questions query"+ JSON.stringify(questions))
        return Quizzes().insert({
            quiz_name: quiz.quizname,
            quiz_desc: quiz.quizdesc,
            user_id: quiz.user_id
        })
        .then(function() {
            return Quizzes()
            .then(function(results) {
            var lastQuiz = results.pop();
            var quiz_id = lastQuiz.quiz_id;
            questions.forEach(function(element){
            element.quiz_id = quiz_id;
            });
            console.log("this is questions before insert"+JSON.stringify(questions));
            return Questions()
            .insert(
             questions
          )    
         })
       })   
      },  
    editQuiz: function(quiz, id) {
        return Quizzes().where('quiz_id',id).update({
            quiz_name: quiz.quiz_name,
            quiz_desc: quiz.quiz_desc,
            quiz_tags: quiz.quiz_tags,
            last_update: knex.fn.now()
        })
        .then(function(results) {
            console.log("update quiz results"+ JSON.stringify(results));
            return results;
        }); 
    },
    addQuestion: function(question) {
        return Questions().returning(['quiz_id', 'question', 'a1', 'a2', 'a3', 'a4']).insert({
            quiz_id: question.quiz_id,
            question: question.question,
            a1: question.a1,
            a2: question.a2,
            a3: question.a3,
            a4: question.a4,
        })
        .then(function(results) {
            console.log("adding an additional question"+ JSON.stringify(results));
            return results;
        }); 
    },
    editQuestion: function(question, id) {
        return Questions().where('quest_id',id).update({
            question: question.question,
            a1: question.a1,
            a2: question.a2,
            a3: question.a3,
            a4: question.a4,
        })
        .then(function(results) {
            console.log("update question results"+ JSON.stringify(results));
            return results;
        }); 
    },
    deleteQuestion: function(id) {
        return Questions().where('quest_id',id).del().then(function(results) {
            return results;
        })
    },
    deleteQuiz: function(id) {
      return Quizzes().where('quiz_id', id).del().then(function(results) {
          return results;
        });
     }



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
