const knex = require("../config/db/knex");

exports.get = async () => {
  const result = await knex("projects ");
  return result;
};

exports.create = async (name) => {
  const result = await knex("projects").insert({ name: name }, [
    "id",
    "name",
    "created_at",
    "updated_at",
  ]);
  return result;
};
