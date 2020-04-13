const knex = require("../config/db/knex");

exports.get = async () => {
  try {
    const result = await knex("projects ");
    return result;
  } catch (error) {
    return errror;
  }
};

exports.create = async (name) => {
  try {
    const result = await knex("projects").insert({ name: name }, [
      "id",
      "name",
      "created_at",
      "updated_at",
    ]);
    return result;
  } catch (error) {
    return error;
  }
};
