const passport = require("../../config/passport");
const router = require("express").Router();
const controller = require("./controller");

router.post("/login", passport.authenticate("local"), controller.login);
router.post("/register", controller.register);

module.exports = router;
