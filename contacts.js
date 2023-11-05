const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      console.table(contacts);
    })
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const contact = contacts.find((c) => c.id === contactId);
      console.table(contact);
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const contactIndex = contacts.findIndex(
        (contact) => contact.id === contactId
      );

      if (contactIndex === -1) {
        return;
      }

      contacts.splice(contactIndex, 1);

      fs.writeFile(contactsPath, JSON.stringify(contacts)).catch((err) =>
        console.log(err.message)
      );

      console.table(contacts);
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const contact = {
        id: uuidv4(),
        name: name,
        email: email,
        phone: phone,
      };

      contacts.push(contact);

      fs.writeFile(contactsPath, JSON.stringify(contacts)).catch((err) =>
        console.log(err.message)
      );

      console.table(contacts);
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
