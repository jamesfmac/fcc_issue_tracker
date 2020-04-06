const { Router } = require("express");

const api = Router();

api.get("/issues/:project");
//example /issues/alpha?status=open

api.get("/project/:project/issues");
//example /project/alpha/issues?status=open
