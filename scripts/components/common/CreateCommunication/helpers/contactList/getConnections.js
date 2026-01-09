/*
 * Returns connections as organisation connections and personal connections.
 */

import { getOrgPostalAddress } from "./getOrgPostalAddress";

export const getConnections = (contact) => {
  const { connections, organisation } = contact;
  if (!connections) return [];
  return connections.map((connection) => {
    const { detail, ...remainingConnection } = connection;
    const orgAddress = getOrgPostalAddress(contact);

    /*
     * Creates an organisation connection from a connection's details and the organisation it is connected to.
     * Adds organisation specific details (Email, Organisation name).
     * Adds organisation's address or connections personal address to organisation connection depending on useOrgAddress flag.
     */
    return {
      ...detail,
      // Overwrites connections personal details with org specific details
      ...remainingConnection,
      // Adds organisation name to the connection if the useOrgAddress flag is set,
      ...(remainingConnection.useOrgAddress && { organisation }),
      // Attaches the organisations address to the connection if useOrgAddress flag is set, overwrites personal address
      ...(remainingConnection.useOrgAddress && { ...orgAddress }),
    };
  });
};
