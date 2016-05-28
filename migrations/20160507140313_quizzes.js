
exports.up = function(knex, Promise) {
   return knex.schema.createTable('quizzes', function(table){
    table.increments('quiz_id');
    table.integer('user_id').references('u_id').inTable('users');
    table.timestamp('created').defaultTo(knex.fn.now());
    table.timestamp('last_update').defaultTo(knex.fn.now());
    table.string('quiz_name');
    table.text('quiz_desc');
    table.string('quiz_tags');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('quizzes');
};  
