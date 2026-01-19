/* eslint-disable no-unused-vars */
import { deleteReq, get, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * Get list of groups.
 * @param modalActions - Use global modal component to catch errors
 * @param {Int} id - Id of the group whose details are required.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getGroups = async (modalActions, id = "") => {
  const url = id ? "/usergroups/" + id : "/usergroups";
  return await get(url).catch((error) =>
    handleError("getGroups", error, modalActions)
  );
};

/**
 * Get list of groups.
 * @param modalActions - Use global modal component to catch errors
 * @param {Int} id - Id of the group whose details are required.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getOwnGroups = async (modalActions) => {
  return await get("/usergroups/me").catch((error) =>
    handleError("groups", error, modalActions)
  );
};

/**
 * Create a group with its name and default settings passed in payload.
 * @param modalActions - Use global modal component to catch errors
 * @param {Object} payload - The payload passed to the backend.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */

const createGroup = async (payload, modalActions) =>
  await post("/usergroups", payload).catch((error) =>
    handleError("groups", error, modalActions)
  );

/** Update an existing Group.
 * @param {Object} payload - The payload passed to the backend.
 * @param modalActions
 * @param {Number} id - The id of the group to be updated.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const updateGroup = async (id, payload, modalActions) =>
  await post("/usergroups/" + id, payload).catch((error) =>
    handleError("groups", error, modalActions)
  );

/**
 * Get Permissions for a case.
 * @param modalActions - Use global modal component to catch errors
 * @param {Int} id - Id of the case whose details are required.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */

const getCasePermissions = async (id, modalActions) => {
  return await get("/permissions/case/" + id).catch((error) =>
    handleError("groups", error, modalActions)
  );
};

/**
 * Get Permissions for a case.
 * @param modalActions - Use global modal component to catch errors
 * @param {Int} id - Id of the case whose details are required.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */

const updateCasePermissions = async (id, payload, modalActions) => {
  return await post("/permissions/case/" + id, payload).catch((error) =>
    handleError("groups", error, modalActions)
  );
};

/**
 * Delete a group with a specific id.
 * @param modalActions - Use global modal component to catch errors
 * @param {Int} id - Id of the group to be deleted.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */

const deleteGroup = async (id, modalActions) =>
  await deleteReq("/usergroups/" + id).catch((error) =>
    handleError(("groups", error, modalActions))
  );

const groupsAPI = {
  getGroups: getGroups,
  createGroup: createGroup,
  deleteGroup: deleteGroup,
  updateGroup: updateGroup,
  getCasePermissions: getCasePermissions,
  getOwnGroups: getOwnGroups,
  updateCasePermissions: updateCasePermissions,
};

export default groupsAPI;
