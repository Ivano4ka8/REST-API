const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      res.status(400);
      res.json({ code: 400, message: `Joi: ${errorMessage}` });
    }

    next();
  };
  return func;
};

module.exports = validateBody;
