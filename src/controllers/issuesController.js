const knex = require("../config/db/knex");
const { body, param, query, validationResult } = require("express-validator");

exports.validate = method => {
  switch (method) {
    case "deleteIssue": {
      return [
        body("id", "id must be a valid issue id")
          .exists()
          .isInt()
      ];
    }
    case "getIssues": {
      return [
        param("project", "Project must be a valid project name")
          .exists()
          .isString()
          .notEmpty()
          .escape(),
        query("open", "Open must be true or false")
          .optional()
          .isBoolean()
          .toBoolean()
      ];
    }
  }
};

exports.getIssues = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const project = req.params.project;

    console.log(project);

    const issues = await knex
      .select(
        "issues.id",
        "issues.issue_title",
        "issues.issue_text",
        "issues.status_text",
        "issues.open",
        "issues.assigned_to",
        "projects.name",
        "issues.created_by",
        "issues.created_at",
        "issues.updated_at"
      )
      .from("issues")
      .join("projects", "issues.project_id", "=", "projects.id")
      .where("projects.name", project);

    res.json(issues);
  } catch (err) {
    return next(err);
  }
};

exports.createIssue = async (project, issueBody) => {
  const project_id = await knex
    .select("id")
    .from("projects")
    .where("name", project);

  console.log(project_id);

  issueBody.project_id = project_id[0].id;

  const issue = await knex("issues").insert(issueBody, [
    "id",
    "issue_title",
    "issue_text",
    "status_text",
    "open",
    "assigned_to",
    "created_by",
    "created_at",
    "updated_at"
  ]);
  return issue;
};

exports.deleteIssue = async (req, res, next) => {
  try {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { id } = req.body;

    const result = await knex("issues")
      .where("id", id)
      .del();

    res.json(result);
  } catch (err) {
    return next(err);
  }
};
