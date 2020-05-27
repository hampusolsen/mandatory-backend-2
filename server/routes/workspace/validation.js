const { body } = require("express-validator");

const CREATE_LIST = "CREATE_LIST";
const CREATE_WORKSPACE = "CREATE_WORKSPACE";

module.exports = {
  CREATE_LIST,
  CREATE_WORKSPACE,
  validate: (method) => {
    switch (method) {
      case CREATE_LIST:
        return body("title").isLength({ min: 3 });
      case CREATE_WORKSPACE:
        return [body("title").isLength({ min: 3 }), body("password").isLength({ min: 7 })];
    }
  },
};
