const router = require("express").Router();
const controller = require("./controller");
const { validate, CREATE, PATCH } = require("./validation");

router.post("/", validate(CREATE), controller.createTicket);
router.get("/:ticketId", controller.retrieveTicket);
router.delete("/:ticketId", controller.deleteTicket);
router.patch("/:ticketId", validate(PATCH), controller.patchTicket);

module.exports = router;
