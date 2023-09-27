const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// TODO: задокументировать каждую функцию

/**
 * Return contacts array
 */
async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath));
}

/**
 * Return contact by Id
 * @param {string} contactId
 */
async function getContactById(contactId) {
  const contact = (await listContacts()).find(
    contact => contact.id === contactId
  );
  return contact || null;
}

/**
 * Remove contact from list by Id
 * @param {string} contactId
 */
async function removeContact(contactId) {
  const contacts = await listContacts();
  const removedContact = contacts.filter(contact => contact.id === contactId);
  const newList = contacts.filter(contact => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
  return removedContact.pop() || null;
}

/**
 * Add contact to list
 * @param {string} name
 * @param {string} email
 * @param {string} phone
 */
async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
