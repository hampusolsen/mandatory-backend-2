const { body } = require("express-validator");

const REGISTER = "REGISTER";
const LOGIN = "LOGIN";

module.exports = {
  REGISTER,
  LOGIN,
  validate: (method) => {
    switch (method) {
      case REGISTER:
        return [body("first_name", "last_name").isLength({ min: 3 }), body("email").isEmail(), body("password").isLength({ min: 7 })];
      case LOGIN:
        return [body("email").isEmail(), body("password").isLength({ min: 7 })];
    }
  },
};
