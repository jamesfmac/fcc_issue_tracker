const { onUpdateTrigger } = require("../../../../knexfile");

exports.up = knex =>
  knex.schema
    .createTable("issues", t => {
      t.increments("id").primary();
      t.integer("project_id").unsigned();
      t.foreign("project_id")
        .references("projects.id")
        .onDelete("CASCADE");
      t.string("issue_title");
      t.text("issue_text");
      t.string("created_by");
      t.string("assigned_to");
      t.string("status_text");
      t.boolean("open")
      .defaultTo(true)
      t.timestamps(false, true);
    })
    .then(() => knex.raw(onUpdateTrigger("issues")));

exports.down = knex => knex.schema.dropTable("issues");
