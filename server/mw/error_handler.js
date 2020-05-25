const ERR_AUTH = { msg: "Unauthorized user access." };
const ERR_INTERNAL = { msg: "Internal server error." };

module.exports = () => {
  return (err, _req, res, _next) => {
    switch (err.name) {
      case "AuthError":
        return res.status(401).send(ERR_AUTH);
      case "MongoError":
        return res.status(409).send(err.errmsg);
      default:
        return res.status(500).send(ERR_INTERNAL);
    }
  };
};
