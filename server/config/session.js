const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const connection = require("./database");

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});

module.exports = () =>
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: parseInt(process.env.SESSION_LENGTH),
    },
  });
