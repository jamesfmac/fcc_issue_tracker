const knex = require("../config/db/knex");

exports.get = async (query) => {
  try {
    const result = await knex
      .select(
        "issues.id",
        "projects.name as project_name",
        "issues.issue_title",
        "issues.issue_text",
        "issues.status_text",
        "issues.open",
        "issues.assigned_to",
        "issues.created_by",
        "issues.created_at",
        "issues.updated_at"
      )
      .from("issues")
      .join("projects", "issues.project_id", "=", "projects.id")
      .where(query);

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.create = async (project, issue) => {

    const project_id = await knex
      .select("id")
      .from("projects")
      .where("name", project);

    issue.project_id = project_id[0].id;

    const response = await knex("issues").insert(issue, [
      "id",
      "issue_title",
      "issue_text",
      "status_text",
      "open",
      "assigned_to",
      "created_by",
      "created_at",
      "updated_at",
    ]);

    return response;

};

exports.update = async (id, body) => {
  try {
    const result = await knex("issues").where("id", id).update(body);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.delete = async (id) => {
  try {
    const result = await knex("issues").where("id", id).del();
    return result;
  } catch (error) {
    return error;
  }
};
