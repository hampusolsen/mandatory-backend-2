const { Workspace } = require("../config/database").models;

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.status(401).send({ msg: "Unauthorized user access." });
};

module.exports.isAdmin = async (req, res, next) => {
  const { workspaceId } = req.params;
  const userId = req.user._id;

  const WorkspaceDocument = await Workspace.findById(workspaceId).exec();
  if (WorkspaceDocument.admins.includes(userId)) {
    next();
  } else {
    res.sendStatus(403);
  }
};
