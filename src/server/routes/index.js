var express = require('express');
var router = express.Router();
// var pg = require('pg');
// var connectionString = 'postgres://localhost:5432/alexaquiz';
var knex = require('../../../db/knex');
var queries = require('../queries/queries');
var uqueries = require('../queries/user_queries');
// var path = require('path');
// var passport = require('passport');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// get all
router.get('/', function(req, res, next) {
queries.getAllQuizzes()
  .then(function(results) {
   res.status(200).json({
      status: 'success',
      data: results
    });
  })
  .catch(function (err) {
    return next(err);
  });
});

// get all users
router.get('/users', function(req, res, next) {
 queries.getAllUserPage()
 .then(function(results) {
   res.status(200).json({
      data: results
    });
  })
  .catch(function (err) {
    return next(err);
  });
});

// get all quizzes - may use this later
router.get('/quizzes', function(req, res, next) {
 queries.getAllQuizzes()
  .then(function(results) {
   res.status(200).json({
      status: 'success',
      data: results
    });
  })
  .catch(function (err) {
    return next(err);
  });
});

// get quizzes for an individual user
router.get('/quizzes/:id', function(req, res, next) {
var id = req.params.id;
 queries.getUserQuizzes(id)  
 .then(function(results) {
   console.log("bring back the data");
   res.status(200).json({
      data: results
    });
  })
  .catch(function (err) {
    return next(err);
  });
});

// get single quiz
router.get('/singlequiz/:id', function(req, res, next) {
var id = req.params.id;
 queries.getQuizById(id)  
 .then(function(results) {
   res.status(200).json({
      data: results
    });
  })
  .catch(function (err) {
    return next(err);
  });
});

// get questions for an individual quiz
router.get('/questions/:id', function(req, res, next) {
var id = req.params.id;
 queries.getQuestionByQuiz(id)  
 .then(function(results) {
   console.log("bring back the data"+JSON.stringify(results));
   res.status(200).json({
      data: results
    });
  })
  .catch(function (err) {
    return next(err);
  });
});


 // Get create new quiz form
router.get('/quiz/new', function(req, res, next) {
  res.status(200);
});

//  Create a new quiz
router.post('/quiz/new', function(req, res, next) {
 var quiz = {};
 var questions = req.body.questions;
 quiz.quizname = req.body.quiz.quiz_name;
 quiz.quizdesc = req.body.quiz.quiz_desc;
 quiz.quiztags = req.body.quiz.quiz_tags;
 quiz.user_id = req.body.quiz.user_id;
 var questions = req.body.questions;

 queries.addQuiz(quiz,questions)
 .then(function(fullresults) {
      console.log("full results"+JSON.stringify(fullresults));
      res.status(200).json({
      data: fullresults
    });
   })
  });


//  Create a new quiz
router.post('/question/new', function(req, res, next) {
   var question = {};
   question.quiz_id = req.body.question.quiz_id;
   question.question = req.body.question.question;
   question.a1= req.body.question.a1;
   question.a2= req.body.question.a2;
   question.a3= req.body.question.a3;
   question.a4= req.body.question.a4;

 queries.addQuestion(question)
 .then(function(fullresults) {
      console.log("full results"+fullresults);
      res.status(200).json({
      data: fullresults
    });
   })
  });

// get quiz to edit
router.get('/quiz/edit/:id', function(req, res, next) {
var id = req.params.id;
 queries.getQuizById(id)  
 .then(function(results) {
   res.status(200).json({
      data: results
    });
  })
  .catch(function (err) {
    return next(err);
  });
});


//  Edit quiz
router.post('/quiz/edit/:id', function(req, res, next) {
   var quiz = {};
   quiz.quiz_name = req.body.quiz.quiz_name;
   quiz.quiz_desc = req.body.quiz.quiz_desc;
   quiz.quiz_tags = req.body.quiz.quiz_tags;
   var id = req.body.quiz.quiz_id;

 queries.editQuiz(quiz,id)
 .then(function(fullresults) {
      console.log("full results"+JSON.stringify(fullresults));
      res.status(200).json({
      data: fullresults
    });
   })
  });

//  Edit questions
router.post('/question/edit/:id', function(req, res, next) {

   var question = {};
   question.question = req.body.question.question;
   question.a1 = req.body.question.a1;
   question.a2 = req.body.question.a2;;
   question.a3 = req.body.question.a3;
   question.a4 = req.body.question.a4;
   var id = req.params.id;

 queries.editQuestion(question,id)
 .then(function(fullresults) {
      console.log("full results from edit question"+JSON.stringify(fullresults));
      res.status(200).json({
      data: fullresults
    });
   })
  });


//delete a question
router.post('/question/delete/:id', function(req,res,next) {
  var id = req.params.id;
  queries.deleteQuestion(id).then(function(results) {
   res.status(200).json({
      data: results
    });
  })
  .catch(function (err) {
    return next(err);
  });
});

//delete a quiz
router.post('/quiz/delete/:id', function(req,res,next) {
  var id = req.params.id;
  queries.deleteQuiz(id).then(function(results) {
   res.status(200).json({
      data: results
    });
  })
  .catch(function (err) {
    return next(err);
  });
});

// Login & Authentication
// login route
router.post('/login', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    uqueries.login(email,password)
  .then(function(data) {
    // if username does not exist
    if (!data.length) {
      return res.status(401).json({
      status: 'fail',
      message: 'The email or password is incorrect, please try again.'
      });
    } else {
      var user = data[0];
      // if password is correct
      if (comparePassword(password, user.password)) {
        var token = jwt.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: 500 // expires in 2 hours
        });
        return res.json({
          success: true,
          message: 'This is a token',
          token: token,
          user: user.fname,
          user_id: user.u_id

        });
      } else { // password is incorrect
        return res.status(401).json({
        status: 'fail',
        message: 'The email or password is incorrect, please try again.'
        });
      }
    }
  })
  .catch(function(err) {
    return next(err);
  });
});

// registration route
router.post('/register', function(req, res, next) {

  var email = req.body.email;
  var password = req.body.password;
  var fname = req.body.fname;
  // ensure user does not already exist
  knex('users').where('email', email)
  .then(function(data){
    if(data.length) {
      return res.status(409).json({
      status: 'fail',
      message: 'This email already exists in our system. Please login.'
      });
    } else { // create new user
      // hash and salt the password
      var hashedPassword = hashPassword(password);
      // add user to db
      knex('users').insert({
        fname: fname,
        email: email,
        password: hashedPassword
      }, '*')
      .then(function(data) {
        var user = {
          fname: fname,
          email: email,
          password: hashedPassword,
          u_id: data[0].u_id
        };
        var token = jwt.sign(user, process.env.TOKEN_SECRET, {
          // expiresIn: 500
        });
        res.status(200).json({
            status: "Success",
            token: token,
            user: user.fname,
            user_id: user.u_id
        });
      });
    }
  })
  .catch(function(err){
    return next(err);
  });
});

// ** helpers ** //

// hashes a given password
function hashPassword (password) {
  console.log("hashing password ", password);
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

// compares a given password with a given hashed password, returns true if the match, false otherwise
function comparePassword(password, hashedpassword) {
    return bcrypt.compareSync(password, hashedpassword);
}

module.exports = router;
