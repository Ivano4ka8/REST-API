const {
  findAllContacts,
  findById,
  addContact,
  removeContact,
  updateContact,
} = require("../services/ContactsService");

const HttpError = require("../helpers/index");

class ContactsController {
  getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page, limit, favorite } = req.query;
    const skip = (page - 1) * limit;

    const result = await findAllContacts({ owner, favorite }, skip, limit);
    if (!result) {
      throw HttpError(400, "Unable to contacts");
    }
    res.json(result);
  };

  getById = async (req, res) => {
    const { contactId } = req.params;
    const { _id: owner } = req.user;

    const result = await findById({ _id: contactId, owner });

    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  };

  add = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await addContact({ ...req.body, owner });
    res.status(201).json(result);
  };

  update = async (req, res) => {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await updateContact({ _id: contactId, owner }, req.body);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.status(201).json(result);
  };

  remove = async (req, res) => {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await removeContact({ _id: contactId, owner });
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json({ message: "contact deleted" });
  };
}

module.exports = new ContactsController();
