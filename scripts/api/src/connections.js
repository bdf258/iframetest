import { get, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * get a constituent's connections.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getConnectionsFromConstituent = async (id, modalActions, iln) =>
  await get(`/connections/fromconstituentid/${id}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while fetching connections.")
        : "There was an error while fetching connections.",
      error,
      modalActions
    )
  );

/**
 * Create a connection on a constituent.
 * @param {number} payload.parentID - the constituent ID of the parent
 * @param {number} payload.childID - the constituent ID of the child
 * @param {number} payload.connectionTypeID - The type of the connection
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const createConnection = async (payload, modalActions, iln) =>
  await post("/connections", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while fetching connections.")
        : "There was an error while fetching connections.",
      error,
      modalActions
    )
  );

const connectionsAPI = {
  getConnectionsFromConstituent,
  createConnection,
};

export default connectionsAPI;
