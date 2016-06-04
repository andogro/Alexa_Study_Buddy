
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('questions').del(), 
    // Inserts seed entries
    knex('questions').insert(
        {
          quiz_id: 1,
          question: 'What is the best band of the 70\'s',
          a1: 'King Crimson',
          a2: 'Mothers of Invention',
          a3: 'Yes',
          a4: 'Signs'
        }),
    knex('questions').insert(
        {
          quiz_id: 1,
          question: 'What is the best band of the 80\'s',
          a1: 'Def Leppard',
          a2: 'Motley Crue',
          a3: 'Poison',
          a4: 'Cinderella'

        }),
    knex('questions').insert(
        {
          quiz_id: 5,
          question: 'Is slice destructive',
          a1: 'Yes',
          a2: 'No',
          a3: 'Sometimes',
          a4: 'Depends on the Situation'

        }),
    knex('questions').insert(
        {
          quiz_id: 5,
          question: 'What does pop mean',
          a1: 'take the first indexed item out of an array',
          a2: 'take the last indexed item out of an array',
          a3: 'Take something out of an object',
          a4: 'Add an item to an array'
        })                    
    );
};