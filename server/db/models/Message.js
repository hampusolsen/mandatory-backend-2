const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  author: String,
  created: Date,
  content: String,
  recipient: String,
  read: Boolean,
});

module.exports = MessageSchema;
