var knex = require('../../../db/knex');
var Users = function() { return knex('users');};
var Quizzes = function() {return knex('quizzes');};
var Questions = function() {return knex('questions');};


module.exports = {
    login: function(email,password){
        console.log("this is first login"+email+password)
        return Users().where('email', email)
        .then(function(data) {
          console.log("login results"+JSON.stringify(data));
          return data;
        });//end function
       }//end login 
    }; //end module.exports  


        // deleteUser: function(id) {
    //   return Users().where('u_id', id).del().then(function(results) {
    //       return results;
    //     });
    //  }

//  // Login & Authentication
// // login route
// router.post('/login', function(req, res, next) {
//   var email = req.body.email;
//   var password = req.body.password;
//   console.log("in back-end login route!!!")
//   // ensure that user exists
//   knex('users').where('email', email)
//   .then(function(data) {
//     // if username does not exist
//     console.log("knex return data after login post:", data)
//     if (!data.length) {
//       return res.status(401).json({
//       status: 'fail',
//       message: 'Email does not exist'
//       });
//     } else {
//       var user = data[0];
//       // if password is correct
//       if (comparePassword(password, user.password)) {
//         var token = jwt.sign(user, process.env.TOKEN_SECRET, {
//           expiresIn: 6000 // expires in 24 hours
//         });
//         return res.json({
//           success: true,
//           message: 'this is token!',
//           token: token,
//           username: user.name,
//           user_id: user.id

//         });
//       } else { // password is incorrect
//         return res.status(401).json({
//         status: 'fail',
//         message: 'Incorrect password'
//         });
//       }
//     }
//   })
//   .catch(function(err) {
//     return next(err);
//   });
// });