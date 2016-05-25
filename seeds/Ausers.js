exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert(
        {
          fname: 'John',
          email: 'john.test@gmail.com',
          password: '123abc',
          bio: 'I enjoy writing databases and seed files. Seed the world with the beautiful database seeds and watch the data trees grow.'
        }),
    knex('users').insert(
        {
          fname: 'Jim',
          email: 'jim.johnson@gmail.com',
          password: '123abc',
          bio: 'I am an artist and am really into fashion and art.'
        }),
    knex('users').insert(
        {
          fname: 'Cooper',
          email: 'cooper.montoya@gmail.com',
          password: '123abc',
          bio: 'I have 3 kids and like to visit all the kid friendly places around Denver.'
        })                    
    );
};