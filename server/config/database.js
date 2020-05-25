const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const connection = mongoose.createConnection(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connection.model("Comment", require("../db/models/Comment"));
connection.model("Task", require("../db/models/Task"));
connection.model("Ticket", require("../db/models/Ticket"));
connection.model("List", require("../db/models/List"));
connection.model("Workspace", require("../db/models/Workspace"));
connection.model("User", require("../db/models/User"));

module.exports = connection;
