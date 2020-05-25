const router = require("express").Router();
const controller = require("./controller");

router.post("/", controller.createTicket);
router.get("/", controller.retrieveTicketData);
router.delete("/:ticketId", controller.deleteTicket);

module.exports = router;
