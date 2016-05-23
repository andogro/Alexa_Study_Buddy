var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/alexaquiz';
var knex = require('../../../db/knex');
var queries = require('../queries/queries');
var path = require('path');

// get all
router.get('/', function(req, res, next) {
  res.sendFile('/index.html');
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

// // get all quizzes - may use this later
// router.get('/quizzes', function(req, res, next) {
//  queries.getAllQuizes()
//   .then(function(results) {
//    res.status(200).json({
//       status: 'success',
//       data: results
//     });
//   })
//   .catch(function (err) {
//     return next(err);
//   });
// });

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
 queries.showOneQuiz(id)  
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
 queries.addQuiz(info)
 .then(function(fullresults) {
      console.log("full results"+fullresults)
      res.status(200).json({
      data: fullresults
    });
   })
  });


module.exports = router;
