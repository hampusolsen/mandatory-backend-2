const mongoose = require("mongoose");
const TaskSchema = require("./Task");

const TicketSchema = new mongoose.Schema({
  title: String,
  description: String,
  created: Date,
  parent_id: mongoose.Types.ObjectId,
  owned_by: mongoose.Types.ObjectId,
  file_paths: [String],
  tasks: [TaskSchema],
  marked_for_review: Boolean,
  done: Boolean,
  current_index: Number,
});

module.exports = TicketSchema;
