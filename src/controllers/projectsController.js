exports.getProjects = async (req, res) => {
  res.json({
    projects: ["one", "two", "three"]
  });
};
