/*
 * Returns the entity contact, or top level contact details
 * Removes connections from the entity
 */

export const getEntityContact = (contact) => {
  const { connections, ...remainingContact } = contact;
  return remainingContact;
};
