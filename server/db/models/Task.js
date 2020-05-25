const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  done: Boolean,
  parent_id: mongoose.Types.ObjectId,
});

module.exports = TaskSchema;
