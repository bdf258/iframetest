/*
 * Utility function that removes invalid contacts from constituents, organisation and connections
 *
 * Contacts, Organisations / Constituents
 * Removes contacts that do not have the isOrganisation property.
 * Removes organisations without a name.
 * Removes constituents without a surname.
 *
 * Connections
 * Removes connections that have been deleted.
 * Removes connections that do not have a detail property.
 * Removes connections that do not have the isOrganisation property.
 * Removes connection that are organisations without a name.
 * Removes connections that are constituents without a surname.
 */

const validateContact = (contact) => {
  if (!contact.hasOwnProperty("isOrganisation")) return false;

  const { isOrganisation, organisation, surname, firstName } = contact;

  if (isOrganisation === undefined) {
    return false;
  }

  if (isOrganisation) {
    if (!organisation) return false;
  }

  if (!isOrganisation) {
    if (!surname && !firstName) return false;
  }
  return true;
};

const connectionHasDetails = (connection) => {
  if (!connection.hasOwnProperty("detail")) return false;
  if (!connection.detail) return false;
  return true;
};

const removeDeletedConnections = (connections) =>
  connections.filter((connection) => !connection.deleted);

const getConnections = (connections = []) => {
  const connectionsWithDetails = connections.filter((connection) =>
    connectionHasDetails(connection)
  );

  const validConnections = connectionsWithDetails.filter((connection) =>
    validateContact(connection.detail)
  );

  return removeDeletedConnections(validConnections);
};
export const cleanseContactLists = (contactList) =>
  contactList
    .filter((contact) => {
      return validateContact(contact);
    })
    .map((contact) => {
      const { connections } = contact;
      return {
        ...contact,
        connections: getConnections(connections),
      };
    });
