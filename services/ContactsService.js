const Contact = require("../models/Contact.js");

class ContactsService {
  findAllContacts = async () => {
    const contacts = await Contact.find({});
    return contacts ? contacts : null;
  };

  findById = async (contactId) => {
    const contact = await Contact.findById(contactId);
    return contact || null;
  };

  addContact = async (data) => {
    const contact = await Contact.create({ ...data });
    return contact || null;
  };

  updateContact = async (id, data) => {
    const contact = await Contact.findByIdAndUpdate(id, { ...data });
    return contact || null;
  };

  removeContact = async (id) => {
    const contact = await Contact.findByIdAndDelete(id);
    return contact || null;
  };
}

module.exports = new ContactsService();
