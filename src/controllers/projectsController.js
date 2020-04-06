const knex = require("../config/db/knex");

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
  const projects = await knex("projects");
  res.json(projects);
};

exports.createProject = async (req, res) => {
  const project = await knex("projects").insert(
    { name: req.body.project_name },
    ["id", "name", "created_at", "updated_at"]
  );
  res.json(project);
};
