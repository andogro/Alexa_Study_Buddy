
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
          quiz_id: 2,
          question: 'What is the best band of the 90\'s',
          a1: 'Smashing Pumpkins',
          a2: 'Cellophane',
          a3: 'Word Road',
          a4: 'This n That'
        })                    
    );
};