const issues = [
  {
    project: "alpha",
    title: "Write Spec",
    text: "We need a big document",
    created_by: "Seed",
    assigned_to: null,
    status_text: "In Progress"
  },
  {
    project: "beta",
    title: "Fire the client",
    text: "Not worth the effort",
    created_by: "Seed",
    assigned_to: null,
    status_text: "In Progress"
  }
];

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("issues")
    .del()
    .then(async function() {
      // Inserts seed entries
      const mapProjectToID = async issue => {
        const project = await knex("projects")
          .where("name", issue.project)
          .first();
        return {
          project_id: project.id,
          title: issue.title,
          text: issue.text,
          created_by: issue.created_by,
          assigned_to: issue.assigned_to,
          status_text: issue.status_text
        };
      };

      const getIssues = async () => {
        return Promise.all(issues.map(issue => mapProjectToID(issue)));
      };

      const result = await getIssues();

      return knex("issues").insert(result);
    });
};
