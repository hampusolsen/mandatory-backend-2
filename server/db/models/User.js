const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  full_name: String,
  email: {
    type: String,
    unique: true,
    index: true,
  },
  hash: String,
  salt: String,
  workspaces_joined: [
    {
      title: String,
      _id: mongoose.Types.ObjectId,
    },
  ],
  items_owned: [String],
});

module.exports = UserSchema;
