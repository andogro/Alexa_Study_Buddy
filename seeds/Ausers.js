var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert(
        {
          fname: 'John',
          email: 'john.test@gmail.com',
          password: bcrypt.hashSync('abc123', 10)
      }),
    knex('users').insert(
        {
          fname: 'Jim',
          email: 'jim.johnson@gmail.com',
          password: bcrypt.hashSync('abc123', 10)
     }),
    knex('users').insert(
        {
          fname: 'Andy',
          email: 'andy@andy.com',
          password: bcrypt.hashSync('andy', 10)
     }),
    knex('users').insert(
        {
          fname: 'Cooper',
          email: 'cooper.montoya@gmail.com',
          password: bcrypt.hashSync('abc123', 10)
     })                    
  );
};