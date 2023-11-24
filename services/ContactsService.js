const Contact = require("../models/Contact.js");

class ContactsService {
  findAllContacts = async ({ owner, favorite }, skip, limit) => {
    const contacts = await Contact.find(
      { owner, favorite },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    );
    return contacts ? contacts : null;
  };

  findById = async ({ _id: contactId, owner }) => {
    const contact = await Contact.findOne({ _id: contactId, owner });
    return contact || null;
  };

  addContact = async (data) => {
    const contact = await Contact.create({ ...data });
    return contact || null;
  };

  updateContact = async ({ _id: contactId, owner }, data) => {
    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      data
    );
    return contact || null;
  };

  removeContact = async ({ _id: contactId, owner }) => {
    const contact = await Contact.findOneAndDelete({ _id: contactId, owner });
    return contact || null;
  };
}

module.exports = new ContactsService();
