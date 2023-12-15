const HttpError = require("../helpers/index");

const isEmtyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  if (!keys.length) {
    return next(HttpError(400, "missing required name field"));
  }
  next();
};
module.exports = isEmtyBody;
