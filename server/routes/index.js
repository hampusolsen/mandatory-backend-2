const router = require("express").Router();
const ticketRoutes = require("./ticket/index");
const userRoutes = require("./user/index");
const workspaceRoutes = require("./workspace/index");

router.use("/ticket/", ticketRoutes);
router.use("/user/", userRoutes);
router.use("/workspace/", workspaceRoutes);

module.exports = router;
