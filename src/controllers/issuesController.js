const knex = require("../config/db/knex");
const { body, param, query, oneOf } = require("express-validator");

exports.validationRules = (method) => {
  switch (method) {
    case "deleteIssue": {
      return [
        param("project", "Must be a valid project name").exists().isString(),
        param("issue").exists().isInt(),
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
          .toBoolean(),
        query("issue_title").optional().isString().escape(),
        query("issue_text").optional().isString().escape(),
        query("status_text").optional().isString().escape(),
        query("assigned_to").optional().isString().escape(),
        query("created_by").optional().isString().escape(),
      ];
    }

    case "updateIssue": {
      return [
        param("issue", "Must provide a valid issue ID").isInt(),
        body()
          .exists()
          .custom((value) => Object.keys(value).length > 0)
          .withMessage("Request body can't be empty"),
        body("issue_title").optional().isString().escape(),
        body("issue_text").optional().isString().escape(),
        body("assigned_to").optional().isString().escape(),
        body("status_text").optional().isString().escape(),
        body("open", "Open must be true or false")
          .optional()
          .isBoolean()
          .toBoolean(),
      ];
    }
    case "createIssue": {
      return [
        body("issue_title").isString().escape(),
        body("issue_text").isString().escape(),
        body("created_by").isString().escape(),
        body("assigned_to").optional().isString().escape(),
        body("status_text").optional().isString().escape(),
      ];
    }
  }
};

exports.getIssues = async (req, res, next) => {
  try {
    const filter = req.query;

    filter["projects.name"] = req.params.project;

    const issues = await knex
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
      .where(filter);

    res.json(issues);
  } catch (err) {
    return next(err);
  }
};

exports.createIssue = async (req, res, next) => {
  try {
    const project_id = await knex
      .select("id")
      .from("projects")
      .where("name", req.params.project);

    let issueBody = req.body;

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
      "updated_at",
    ]);
    res.json(issue);
  } catch (err) {
    return next(err);
  }
};

exports.updateIssue = async (req, res, next) => {
  try {
    const result = await knex("issues")
      .where("id", req.params.issue)
      .update(req.body);

    res.json(result);
  } catch (err) {
    return next(err);
  }
};

exports.deleteIssue = async (req, res, next) => {
  try {
    const result = await knex("issues").where("id", req.params.issue).del();

    res.json(result);
  } catch (err) {
    return next(err);
  }
};
