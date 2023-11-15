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
} = require("../../schemas/contactsSchemas.js");
const { validaterBody } = require("../../decorators/index.js");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", isEmtyBody, validaterBody(addContactSchema), add);

router.delete("/:contactId", remove);

router.put(
  "/:contactId",
  isEmtyBody,
  validaterBody(updateContactSchema),
  update
);

module.exports = router;
