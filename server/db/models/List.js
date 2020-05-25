const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  title: String,
  parent_id: String,
  created: Date,
  current_index: Number,
});

module.exports = ListSchema;
