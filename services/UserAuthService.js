const User = require("../models/User.js");
const HttpError = require("../helpers/HttpError");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

class UserAuthService {
  register = async (email, password, data) => {
    console.log(email, password, data);
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      ...data,
      password: hashPassword,
    });
    return newUser || null;
  };
  login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    const updatedUser = await User.findByIdAndUpdate(user._id, { token });

    return { updatedUser, token } || null;
  };
  logout = async (_id) => {
    if (!_id) {
      throw HttpError(401, "Not authorized");
    }
    const result = await User.findByIdAndUpdate(_id, { token: "" });
    return result || null;
  };
  changeStatus = async (_id, subscription) => {
    if (!_id) {
      throw HttpError(401, "Not authirized");
    }
    const user = await User.findByIdAndUpdate(_id, { subscription });

    return user || null;
  };
}

module.exports = new UserAuthService();
