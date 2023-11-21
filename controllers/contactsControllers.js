const {
  findAllContacts,
  findById,
  addContact,
  removeContact,
  updateContact,
} = require("../services/ContactsService");

const HttpError = require("../helpers/HttpError.js");

class ContactsController {
  getAllContacts = async (req, res) => {
    const result = await findAllContacts();
    if (!result) {
      throw HttpError(400, "Unable to cars");
    }
    res.json(result);
  };

  getById = async (req, res) => {
    const { contactId } = req.params;

    const result = await findById(contactId);

    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  };

  add = async (req, res) => {
    const result = await addContact({ ...req.body });
    res.status(201).json(result);
  };

  update = async (req, res) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, {
      ...req.body,
    });
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.status(201).json(result);
  };

  remove = async (req, res) => {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json({ message: "contact deleted" });
  };
}

module.exports = new ContactsController();
