const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const HttpError = require("../helpers/index");
const User = require("../models/User");

const isValidToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw HttpError(401, "Not authorized");
  }
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    throw HttpError(401, error.message);
  }
};

module.exports = isValidToken;
