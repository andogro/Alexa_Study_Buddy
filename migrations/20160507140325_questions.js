exports.up = function(knex, Promise) {
   return knex.schema.createTable('questions', function(table){
    table.increments('quest_id');
    table.integer('quiz_id').references('quiz_id').inTable('quizzes');
    table.string('question');
    table.string('a1');
    table.string('a2');
    table.string('a3');
    table.string('a4');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('questions');
};  
