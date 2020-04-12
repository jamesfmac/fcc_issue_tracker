const { Router } = require("express");
const { validate } = require("../utils/validator");
const projectsControler = require("../controllers/projectsController");
const issuesController = require("../controllers/issuesController");

module.exports = () => {
  let api = Router();

  api.route("/").get(function (req, res) {
    res.sendFile(process.cwd() + "/src/views/index.html");
  });


  api
    .route("/projects")
    .get(
      projectsControler.validationRules("getProjects"),
      validate,
      projectsControler.getProjects
    )
    .post(
      projectsControler.validationRules("createProject"),
      validate,
      projectsControler.createProject
    );

  api
    .route("/issues/:project")
    .get(
      issuesController.validationRules("getIssues"),
      validate,
      issuesController.getIssues
    )
    .post(
      issuesController.validationRules("createIssue"),
      validate,
      issuesController.createIssue
    );

  api
    .route("/issues/:project/:issue")
    .put(
      issuesController.validationRules("updateIssue"),
      validate,
      issuesController.updateIssue
    )
    .delete(
      issuesController.validationRules("deleteIssue"),
      validate,
      issuesController.deleteIssue
    );

  return api;
};
