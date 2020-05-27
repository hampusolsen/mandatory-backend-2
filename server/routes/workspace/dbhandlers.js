const { List, Ticket, Task } = require("../../config/database").models;

module.exports.findTicketsMinified = (listId) => {
  const fieldOpts = {
    title: 1,
    created: 1,
    description: 1,
    parent_id: 1,
  };

  return new Promise((resolve, reject) => {
    Ticket.find({ parent_id: listId }, fieldOpts, (err, tickets) => {
      if (err) return reject(err);
      return resolve(tickets);
    });
  });
};

module.exports.findLists = (workspaceId) => {
  return new Promise((resolve, reject) => {
    List.find({ parent_id: workspaceId }, (err, lists) => {
      if (err) return reject(err);
      return resolve(lists);
    });
  });
};

module.exports.addList = (list) => {
  const _list = new List(list);
  return _list.save();
};
