const router = require("express").Router();
const controller = require("./controller");
const { isAdmin } = require("../../mw/auth");

router.post("/", controller.createWorkspace);
router.delete("/:workspaceId/:listId", isAdmin, controller.deleteList);
router.get("/:workspaceId/", controller.retrieveListData);
router.post("/:workspaceId/", isAdmin, controller.createList);

module.exports = router;
