import { constituentHasEmailAddress } from "./constituentHasEmail";

/*
 * Checks if a constituent has at least one connection with an email address
 */
export const constituentHasConnectionsWithEmailAddresses = (constituent) => {
  const { connections } = constituent;
  if (connections.length === 0) return false;
  const connectionsWithValidEmailAddresses = connections.reduce(
    (acc, connection) => {
      const hasEmailAtOrganisation = connection.email;
      const hasPersonalEmail = constituentHasEmailAddress(connection.details);
      if (hasEmailAtOrganisation || hasPersonalEmail) {
        return [...acc, connection];
      }
      return acc;
    },
    []
  );
  return connectionsWithValidEmailAddresses.length > 0;
};
