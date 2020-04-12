const knex = require("../config/db/knex");

const issue = require("../models/issues");
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

    res.json(await issue.get(filter));
  } catch (err) {
    return next(err);
  }
};

exports.createIssue = async (req, res, next) => {
  try {
    res.json(await issue.create(req.params.project, req.body));
  } catch (err) {
    return next(err);
  }
};

exports.updateIssue = async (req, res, next) => {
  try {
    res.json(await issue.update(req.params.issue, req.body));
  } catch (err) {
    return next(err);
  }
};

exports.deleteIssue = async (req, res, next) => {
  try {
    res.json(await issue.delete(req.params.issue));
  } catch (err) {
    return next(err);
  }
};
