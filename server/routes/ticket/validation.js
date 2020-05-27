const { body, oneOf } = require("express-validator");

const CREATE = "CREATE";
const PATCH = "PATCH";

module.exports = {
  CREATE,
  PATCH,
  validate: (method) => {
    switch (method) {
      case CREATE:
        return [body(["title", "description", "parent_id"]).isLength({ min: 3 })];
      case PATCH:
        return oneOf([body("title", "description").isLength({ min: 3 }), body("parent_id").exists({ min: 9 })]);
    }
  },
};
