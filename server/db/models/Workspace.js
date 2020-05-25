const mongoose = require("mongoose");

const WorkspaceSchema = new mongoose.Schema({
  title: String,
  admins: [String],
  hash: String,
  salt: String,
});

module.exports = WorkspaceSchema;
