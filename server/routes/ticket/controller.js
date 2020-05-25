const { Ticket } = require("../../config/database").models;

module.exports.retrieveTicketData = (req, res, next) => {
  Ticket.findById();
};

module.exports.createTicket = (req, res, _next) => {
  const TicketDocument = new Ticket({
    ...req.body,
    created: Date.now(),
    marked_for_review: false,
    done: false,
    owned_by: req.user._id,
  });

  TicketDocument.save();

  res.status(201).send(TicketDocument);
};

module.exports.deleteTicket = (req, res, next) => {
  Ticket.findByIdAndDelete(req.params.ticketId)
    .then((_doc) => {
      res.sendStatus(204);
    })
    .catch(next);
};
