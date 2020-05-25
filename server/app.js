const express = require("express");
const passport = require("./config/passport");
const session = require("./config/session");
const mogge = require("./mw/mogge");
const routes = require("./routes/index");
const ErrorHandler = require("./mw/error_handler");

const app = express();

/** @Middleware */
// app.use(mogge.debug());
app.use(mogge.logger());
app.use(mogge.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
// app.use(mogge.debug());

/** @Routing */
app.use("/api/", routes);

/** @ErrorHandling */
app.use(ErrorHandler());

module.exports = app;
