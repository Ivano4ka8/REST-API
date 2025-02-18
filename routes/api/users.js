const express = require("express");
const {
  userSignSchema,
  userUpdateStatusSchema,
  userUpdateAvatarSchema,
  userSendVerifySchema,
} = require("../../schemas/usersSchemas");
const {
  signUp,
  signIn,
  logOut,
  getCurrentUser,
  onChangeSubscription,
  onChangeAvatar,
  verifyEmail,
  sendVerifyMore,
} = require("../../controllers/usersControler");
const { validaterBody, ctrlWrapper } = require("../../decorators/index.js");
const {
  isEmptyBody,
  isValidToken,
  upload,
} = require("../../middlewars/index.js");

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  isEmptyBody,
  validaterBody(userSignSchema),
  ctrlWrapper(signUp)
);
authRouter.get("/verify/:verifiedCode", ctrlWrapper(verifyEmail));

authRouter.post(
  "/verify",
  isEmptyBody,
  validaterBody(userSendVerifySchema),
  ctrlWrapper(sendVerifyMore)
);

authRouter.post(
  "/login",
  isEmptyBody,
  validaterBody(userSignSchema),
  ctrlWrapper(signIn)
);
authRouter.post("/logout", isValidToken, logOut);
authRouter.get("/current", isValidToken, getCurrentUser);
authRouter.patch(
  "/subscription",
  isValidToken,
  validaterBody(userUpdateStatusSchema),
  onChangeSubscription
);
authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  isValidToken,
  validaterBody(userUpdateAvatarSchema),
  onChangeAvatar
);

module.exports = authRouter;
