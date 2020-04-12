const knex = require("../config/db/knex");

const project = require("../models/projects");

const { body, query } = require("express-validator");

exports.validationRules = (method) => {
  switch (method) {
    case "getProjects": {
      return [query("id").optional().isNumeric()];
    }
    case "createProject": {
      return [
        body("project_name")
          .isString()
          .withMessage("Name must be a string")
          .isLength({ min: 3, max: 250 })
          .withMessage("Name must be 3 - 250 charectors long")
          .escape(),
      ];
    }
  }
};

exports.getProjects = async (req, res) => {
  res.json(await project.get());
};

exports.createProject = async (req, res) => {
  res.json(await project.create(req.body.project_name));
};
