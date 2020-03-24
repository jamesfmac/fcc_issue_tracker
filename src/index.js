const express = require("express");
const cors = require("cors");

const { PORT } = require("./config");
const projectsController = require("./controllers/projectsController");


const app = express();

//Express configuration

app.set("port", PORT || 3000);

app.use(cors({ origin: "*" })); //for FCC testing only

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/projects", projectsController.getProjects);

//404 Not Found Middleware
app.use(function(req, res, next) {
  res
    .status(404)
    .type("text")
    .send("Not Found");
});

app.listen(app.get("port"), () => {
  console.log(
    `✓ App is running on port ${app.get("port")} in ${app.get("env")} mode`
  );
  console.log("  Press CTRL-C to stop\n");

  if (app.get("env") === "test") {
    console.log("running tests...");

    try {
      runner.run();
    } catch (error) {
      console.log("Tests are not valid:");
      console.log(error);
    }
  }
});

module.exports = app; //for testing
