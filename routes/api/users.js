const express = require("express");
const {
  userSignSchema,
  userUpdateStatusSchema,
} = require("../../schemas/usersSchemas");
const {
  signUp,
  signIn,
  logOut,
  getCurrentUser,
  onChangeSubscription,
} = require("../../controllers/usersControler");
const { validaterBody, ctrlWrapper } = require("../../decorators/index.js");
const { isEmptyBody, isValidToken } = require("../../middlewars/index.js");

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validaterBody(userSignSchema),
  ctrlWrapper(signUp)
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

module.exports = authRouter;
