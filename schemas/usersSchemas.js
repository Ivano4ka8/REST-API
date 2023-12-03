const Joi = require("joi");

const validEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSignSchema = Joi.object({
  email: Joi.string().pattern(validEmail).required(),
  password: Joi.string().min(6).required(),
});

const userUpdateStatusSchema = Joi.object({
  subscription: Joi.string().required(),
});
const userUpdateAvatarSchema = Joi.object({
  avatar: Joi.string().required(),
});

module.exports = {
  userSignSchema,
  userUpdateStatusSchema,
  userUpdateAvatarSchema,
};
