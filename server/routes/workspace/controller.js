const { generatePassword } = require("../../lib/password_utils");
const { User, Workspace, List, Ticket } = require("../../config/database").models;
const { findLists, findTicketsMinified, addList } = require("./dbhandlers");

module.exports.createWorkspace = async (req, res, next) => {
  const { title, password, userId } = req.body;
  const admins = [userId];

  const { hash, salt } = generatePassword(password);
  const WorkspaceDocument = new Workspace({ title, hash, salt, admins });
  WorkspaceDocument.save();

  const workspaceMinified = { title, _id: WorkspaceDocument._id };
  User.findByIdAndUpdate(userId, { $push: { workspaces_joined: workspaceMinified } }, next);
  res.status(201).send(workspaceMinified);
};

module.exports.retrieveListData = async (req, res, next) => {
  const { workspaceId } = req.params;

  findLists(workspaceId)
    .then((lists) => {
      return Promise.all([lists, ...lists.map(({ _id }) => findTicketsMinified(_id))]);
    })
    .then(([lists, ...tickets]) => {
      const populatedLists = lists.map(({ _doc }, idx) => ({ ..._doc, tickets: tickets[idx] }));
      res.status(200).send(populatedLists);
    })
    .catch(next);
};

module.exports.createList = (req, res, next) => {
  const { workspaceId } = req.params;
  const { title, current_index } = req.body;

  const newList = {
    parent_id: workspaceId,
    title,
    current_index,
    created: Date.now(),
  };

  addList(newList)
    .then(({ _doc }) => res.status(201).send({ ..._doc, tickets: [] }))
    .catch(next);
};

module.exports.deleteList = (req, res, next) => {
  Ticket.deleteMany({ parent_id: req.params.listId })
    .then(() => List.findByIdAndDelete(req.params.listId))
    .then(() => res.sendStatus(204))
    .catch(next);
};
