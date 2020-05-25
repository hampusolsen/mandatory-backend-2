const { List, Ticket, Task } = require("../../config/database").models;

module.exports.findTicketsMinified = (listId) => {
  return new Promise((resolve, reject) => {
    Ticket.find({ parent_id: listId }, { title: 1, marked_for_review: 1, current_index: 1, description: 1 }, (err, tickets) => {
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
