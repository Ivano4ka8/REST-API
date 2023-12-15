const User = require("../models/User.js");
const { HttpError, sendEmail } = require("../helpers/index");
const bcrypt = require("bcryptjs");
const { JWT_SECRET, BASE_URL } = process.env;
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const avatarPath = path.resolve("public", "avatars");

class UserAuthService {
  register = async (email, password, data) => {
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const verifiedCode = nanoid();
    const avatar = gravatar.url(email);
    const hashPassword = await bcrypt.hash(password, 10);
    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verifiedCode}">Click verify email</a>`,
    };
    await sendEmail(verifyEmail);
    const newUser = await User.create({
      ...data,
      password: hashPassword,
      avatarURL: avatar,
      verifiedCode,
    });

    return newUser || null;
  };
  login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    if (!user.verify) {
      throw HttpError(401, "Email not verify");
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

  changeAvatar = async (_id, oldPath, filename) => {
    if (!_id) {
      throw HttpError(401, "Not authirized");
    }

    const newPath = path.join(avatarPath, filename);
    const resizedImage = await Jimp.read(oldPath);
    await resizedImage.resize(250, 250).writeAsync(oldPath);

    await fs.rename(oldPath, newPath);
    const newAvatarUrl = path.join("public", "avatars", filename);

    const avatar = await User.findByIdAndUpdate(_id, {
      avatarURL: newAvatarUrl,
    });
    return avatar || null;
  };

  sendVerifyEmail = async (verifiedCode) => {
    const user = await User.findOne({ verifiedCode });

    if (!user) {
      throw HttpError(404, "User not Found");
    }
    await User.findByIdAndUpdate(user._id, {
      verifiedCode: "",
      verify: true,
    });
  };

  resendEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(404, "User not Found");
    }

    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verifiedCode}">Click verify email</a>`,
    };
    await sendEmail(verifyEmail);
  };
}

module.exports = new UserAuthService();
