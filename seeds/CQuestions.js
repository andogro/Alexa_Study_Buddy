
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
        }),
    knex('questions').insert(
        {
          quiz_id: 6,
          question: 'When a gas is turned into a liquid, the process is called',
          a1: 'condensation',
          a2: 'evaporation',
          a3: 'deposition',
          a4: 'sublimation'
        }),
    knex('questions').insert(
        {
          quiz_id: 6,
          question: 'Which of the following parts of the sun is easily visible only during a total solar eclipse',
          a1: 'corona',
          a2: 'core',
          a3: 'photosphere',
          a4: 'sunspots'
        }),
    knex('questions').insert(
        {
          quiz_id: 6,
          question: 'Earth\'s seasons are caused by which of the following',
          a1: 'The tilt of the earth\'s rotation relative to the eliptic as earth revolves around the sun',
          a2: 'The varying amount of sunspot activity',
          a3: 'The earth\'s orbit around the sun as an ellipse rather than a circle',
          a4: 'The rotation of the sun during a 24-hour day'
        }),
    knex('questions').insert(
        {
          quiz_id: 6,
          question: 'Which of the following is most likely to cause a rise in the average temperature of earth\'s atmosphere in future',
          a1: 'CO2 from fossil fuels',
          a2: 'Dust clouds from volcanoes',
          a3: 'Depletion of earth\'s ozone layer',
          a4: 'Atomic warfare'
        }),
    knex('questions').insert(
        {
          quiz_id: 6,
          question: 'The accumulation of stress along the boundaries of lithospheric plates results in which of the following',
          a1: 'Earthquakes',
          a2: 'Magnetic reversals',
          a3: 'Hurricanes',
          a4: 'Increased deposition of deep-sea sediments'
        }),
    knex('questions').insert(
        {
          quiz_id: 6,
          question: 'Which of the following items will be attracted to the north pole of a permanent magnet by a magnet force',
          a1: 'A piece of iron that is not a permanent magnet',
          a2: 'The north pole of another permanent magnet',
          a3: 'A positively charged glass rod',
          a4: 'A negatively charged rubber rod'
        }),
    knex('questions').insert(
        {
          quiz_id: 6,
          question: 'Pollination by birds is called',
          a1: 'ornithophily',
          a2: 'autogamy',
          a3: 'entomophily',
          a4: 'anemophily'
        }),
    knex('questions').insert(
        {
          quiz_id: 6,
          question: 'The fastest-running terrestrial animal is',
          a1: 'cheetah',
          a2: 'lion',
          a3: 'man',
          a4: 'jaguar'
        }),
    knex('questions').insert(
        {
          quiz_id: 6,
          question: 'As you go down into a well, your weight',
          a1: 'decreases slightly',
          a2: 'increases slightly',
          a3: 'remains exactly the same',
          a4: 'increases greatly'
        })
    );
};