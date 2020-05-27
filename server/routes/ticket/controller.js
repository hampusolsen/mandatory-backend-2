const { Ticket } = require("../../config/database").models;
const { validationResult } = require("express-validator");

module.exports.retrieveTicket = (req, res, next) => {
  Ticket.findById(req.params.ticketId);
};

module.exports.createTicket = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return next(err);

  const TicketDocument = new Ticket({
    ...req.body,
    created: Date.now(),
    marked_for_review: false,
    done: false,
    owned_by: req.user._id,
  });

  TicketDocument.save()
    .then((doc) => res.status(201).send(doc))
    .catch(next);
};

module.exports.deleteTicket = (req, res, next) => {
  Ticket.findByIdAndDelete(req.params.ticketId)
    .then((_doc) => res.sendStatus(204))
    .catch(next);
};

module.exports.patchTicket = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return next(err);

  Ticket.findByIdAndUpdate(req.params.ticketId, { ...req.body }, { new: true })
    .then((doc) =>
      res.status(200).send({
        _id: doc._id,
        title: doc.title,
        description: doc.description,
        parent_id: doc.parent_id,
        created: doc.created,
      })
    )
    .catch(next);
};
