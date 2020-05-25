module.exports.debug = () => {
  return (req, _res, next) => {
    console.log(req.user);
    next();
  };
};

module.exports.logger = () => {
  return (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
      console.log(req.method, req.originalUrl, res.statusCode, `${Date.now() - start}ms`);
    });

    next();
  };
};

module.exports.json = () => {
  return (req, _res, next) => {
    if (req.is("application/json")) {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          req.body = JSON.parse(body);
        } catch (err) {
          next(err);
        }

        next();
      });
    } else {
      next();
    }
  };
};
