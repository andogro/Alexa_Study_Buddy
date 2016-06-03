
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('quizzes').del(), 

    // Inserts seed entries
    knex('quizzes').insert(
        {
          quiz_id: 5,
          user_id: 1,
          quiz_name: 'Quiz1',
          quiz_desc: 'The First Test',
          quiz_tags: 'go time',
          created: '2016-04-16 20:07:28-06',
          last_update: '2016-04-17 20:07:28-06'
        }),
    knex('quizzes').insert(
        {
          user_id: 2,
          quiz_name: 'Quiz2',
          quiz_desc: 'Javascript',
          quiz_tags: 'angular, ember',
          created: '2016-03-16 20:07:28-06',
          last_update: '2016-03-21 20:07:28-06'
        }),
    knex('quizzes').insert(
        {
          user_id: 3,
          quiz_name: 'Quiz3',
          quiz_desc: 'The Tech Bubble',
          quiz_tags: 'javascript, Steve Jobs',
          created: '2016-04-22 20:07:28-06',
          last_update: '2016-05-02 20:07:28-06'
        })
    );
};