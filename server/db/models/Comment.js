const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  author: String,
  content: String,
  created: Date,
  reactions: {
    up_votes: Number,
    down_votes: Number,
  },
  parent_id: mongoose.Types.ObjectId,
});

module.exports = CommentSchema;
