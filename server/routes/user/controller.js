const { generatePassword, validatePassword } = require("../../lib/password_utils");
const { User } = require("../../config/database").models;

function login(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      const verified = validatePassword(password, user.hash, user.salt);
      if (!verified) throw { name: "AuthError", message: "Unable to authorize user credentials." };

      const userDetails = { ...user._doc };
      delete userDetails.hash;
      delete userDetails.salt;
      delete userDetails.__v;

      res.status(200).send(userDetails);
    })
    .catch(next);
}

function register(req, res, next) {
  const { hash, salt } = generatePassword(req.body.password);

  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    full_name: req.body.first_name + " " + req.body.last_name,
    email: req.body.email,
    hash,
    salt,
  });

  user
    .save()
    .then((user) => {
      const userDetails = { ...user._doc };
      delete userDetails.salt;
      delete userDetails.hash;
      delete userDetails.__v;

      res.status(201).send(userDetails);
    })
    .catch(next);
}

module.exports.login = login;
module.exports.register = register;
