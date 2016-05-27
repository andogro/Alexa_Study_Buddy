
exports.up = function(knex, Promise) {
   return knex.schema.createTable('users', function(table){
    table.increments('u_id');
    table.string('fname');
    table.string('email');
    table.string('password');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
