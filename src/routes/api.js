const { Router } = require("express");
const projectsControler = require("../controllers/projectsController");
const issuesController = require("../controllers/issuesController");

module.exports = () => {
  let api = Router();

  api.get("/", (req, res) => {
    return res.json({ blah: "blah" });
  });

  api
    .route("/projects")

    .get(async (req, res) => {
      const projects = await projectsControler.getProjects();
      res.json(projects);
    })

    .post(async (req, res) => {
      const project = await projectsControler.createProject(
        req.body.project_name
      );
      res.json(project);
    });

  api
    .route("/issues/:project")

    .get(issuesController.validate("getIssues"), issuesController.getIssues)

    .post(async (req, res) => {
      const project = req.params.project;
      const issue = await issuesController.createIssue(project, req.body);
      res.json(issue);
    })

    .delete(
      issuesController.validate("deleteIssue"),
      issuesController.deleteIssue
    );

  return api;
};
