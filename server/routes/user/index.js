const passport = require("../../config/passport");
const router = require("express").Router();
const controller = require("./controller");
const { validate, LOGIN, REGISTER } = require("./validation");

router.post("/login", passport.authenticate("local"), validate(LOGIN), controller.login);
router.post("/register", validate(REGISTER), controller.register);

module.exports = router;
