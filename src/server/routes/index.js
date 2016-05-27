var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/alexaquiz';
var knex = require('../../../db/knex');
var queries = require('../queries/queries');
var uqueries = require('../queries/user_queries');
var path = require('path');
var passport = require('passport');
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

// // get all users
// router.get('/cards', function(req, res, next) {
//  queries.getAllCards()  
//  .then(function(results) {
//    res.status(200).json({
//       status: 'success',
//       data: results
//     });
//   })
//   .catch(function (err) {
//     return next(err);
//   });
// });

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


 // Get create new quiz form
router.get('/quiz/new', function(req, res, next) {
  res.status(200);
});

//  Post to create a new quiz
router.post('/quiz/new', function(req, res, next) {
 var info = {};
 info.quizname = req.body.quiz_name;
 info.quizdesc = req.body.quiz_desc;
 info.question = req.body.question;
 info.user_id = req.body.user_id;
 info.a1 = req.body.a1;
 info.a2 = req.body.a2;
 info.a3 = req.body.a3;
 info.a4 = req.body.a4;

 queries.addQuiz(info)
 .then(function(fullresults) {
      console.log("full results"+fullresults)
      res.status(200).json({
      data: fullresults
    });
   })
  });


// Login & Authentication
// login route
router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  uqueries.login(email,password)
  .then(function(data) {
    // if username does not exist
    console.log("DATA from Login post route", data)
    if (!data.length) {
      return res.status(401).json({
      status: 'fail',
      message: 'Email does not exist'
      });
    } else {
      var user = data[0];
      console.log("user name" + user.fname, "user password" + user.password)
      // if password is correct
      if (comparePassword(password, user.password)) {
        var token = jwt.sign(user, process.env.TOKEN_SECRET, {
          expiresIn: 6000 // expires in 24 hours
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
        message: 'Incorrect password'
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
      message: 'Email already exists'
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
        console.log("returned data from registration route", data);
        var user = {
          fname: fname,
          email: email,
          password: hashedPassword,
          user_id: data[0].id
        };
        var token = jwt.sign(user, process.env.TOKEN_SECRET, {
          expiresIn: 6000
        });
        res.status(200).json({
            status: "Success",
            token: token,
            username: user.fname,
            user_id: user.user_id
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

/*not currently using
function ensureAuthenticated(req, res, next) {
  if(req.user) {
    return next();
  } else {
    return res.redirect('/login');
  }
}
//not currently using
function loginRedirect(req, res, next) {
  if(req.user) {
    return res.redirect('/');
  } else {
    return next();
  }
}*/


module.exports = router;
