const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    res.status(400);
    throw new Error(`Id: ${contactId} is not valid`);
  }
  next();
};

module.exports = isValidId;
