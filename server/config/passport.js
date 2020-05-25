const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./database").models;
const { validatePassword } = require("../lib/password_utils");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

function verifyCallback(email, password, done) {
  User.findOne({ email })
    .then((user) => {
      if (!user) return done(null, false);

      const isValid = validatePassword(password, user.hash, user.salt);

      if (isValid) return done(null, user);
      else return done(null, false);
    })
    .catch(done);
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

module.exports = passport;
