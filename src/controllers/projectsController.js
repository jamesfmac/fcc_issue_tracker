const knex = require("../config/db/knex");
exports.getProjects = async (id, name) => {
  const projects = await knex("projects");

  return projects;
};

exports.createProject = async name => {
  const project = await knex("projects").insert({ name: name }, [
    "id",
    "name",
    "created_at",
    "updated_at"
  ]);
  return project;
};
