const express = require("express");
const {
  getAllContacts,
  getById,
  add,
  update,
  remove,
} = require("../../controllers/contactsControllers.js");
const {
  isEmptyBody,
  isValidId,
  isValidToken,
} = require("../../middlewars/index.js");
const {
  addContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} = require("../../schemas/contactsSchemas.js");
const { validaterBody, ctrlWrapper } = require("../../decorators/index.js");

const router = express.Router();
router.use(isValidToken);

router.get("/", ctrlWrapper(getAllContacts));

router.get("/:contactId", isValidId, ctrlWrapper(getById));

router.post(
  "/",

  isEmptyBody,
  validaterBody(addContactSchema),
  ctrlWrapper(add)
);

router.delete("/:contactId", isValidId, ctrlWrapper(remove));

router.put(
  "/:contactId",

  isValidId,
  isEmptyBody,
  validaterBody(updateContactSchema),
  ctrlWrapper(update)
);
router.patch(
  "/:contactId/favorite",

  isValidId,
  isEmptyBody,
  validaterBody(updateContactStatusSchema),
  ctrlWrapper(update)
);

module.exports = router;
