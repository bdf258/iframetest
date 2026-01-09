import { getConnections } from "./getConnections";
import { getEntityContact } from "./getEntityContact";

const getConnectionAsPersonalContact = (contact) => {
  const { connections } = contact;
  if (!connections) return [];
  return connections.map((connection) => {
    const { detail, useOrgAddress } = connection;
    return { ...detail, useOrgAddress };
  });
};

const addOrder = (array, order) => array.map((item) => ({ ...item, order }));

/*
  Returns contact lists grouped by contact type
  Entity Contact: Top level contact details
  Connections at Organisation: The connections for the entity
  Connections Personal: Personal contact details of the connection
 */
const groupByContactType = (contactLists) =>
  contactLists.map((contact) => {
    const entityContact = addOrder([getEntityContact(contact)], 1);
    const connectionsAtOrganisation = addOrder(getConnections(contact), 3);
    const connectionsPersonal = addOrder(
      getConnectionAsPersonalContact(contact),
      2
    );

    return {
      entityContact,
      connectionsAtOrganisation,
      connectionsPersonal,
    };
  });

export default groupByContactType;
