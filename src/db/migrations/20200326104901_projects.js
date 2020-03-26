const { onUpdateTrigger } = require("../../../knexfile");

exports.up = knex => {
  knex.schema
    .createTable("projects", t => {
      t.increments("id").primary();
      t.string("name");
      t.timestamps(false, true);
    })
    .then(() => knex.raw(onUpdateTrigger("projects")));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("projects");
};
