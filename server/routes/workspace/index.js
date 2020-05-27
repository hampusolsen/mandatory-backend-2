const router = require("express").Router();
const controller = require("./controller");
const { isAdmin } = require("../../mw/auth");
const { validate, CREATE_WORKSPACE, CREATE_LIST } = require("./validation");

router.post("/", validate(CREATE_WORKSPACE), controller.createWorkspace);
router.delete("/:workspaceId/:listId", isAdmin, controller.deleteList);
router.get("/:workspaceId/", controller.retrieveListData);
router.post("/:workspaceId/", validate(CREATE_LIST), isAdmin, controller.createList);

module.exports = router;
