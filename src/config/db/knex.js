const { NODE_ENV } = require("..");
const config = require("../../../knexfile")[NODE_ENV];

module.exports = require("knex")(config);
