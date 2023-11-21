const express = require("express");
const {
  getAllContacts,
  getById,
  add,
  update,
  remove,
} = require("../../controllers/contactsControllers.js");
const isEmtyBody = require("../../middlewars/isEmptyBody");
const {
  addContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} = require("../../schemas/contactsSchemas.js");
const { validaterBody, ctrlWrapper } = require("../../decorators/index.js");
const isValidId = require("../../middlewars/isValidId.js");

const router = express.Router();

router.get("/", ctrlWrapper(getAllContacts));

router.get("/:contactId", isValidId, ctrlWrapper(getById));

router.post("/", isEmtyBody, validaterBody(addContactSchema), ctrlWrapper(add));

router.delete("/:contactId", isValidId, ctrlWrapper(remove));

router.put(
  "/:contactId",
  isValidId,
  isEmtyBody,
  validaterBody(updateContactSchema),
  ctrlWrapper(update)
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmtyBody,
  validaterBody(updateContactStatusSchema),
  ctrlWrapper(update)
);

module.exports = router;
