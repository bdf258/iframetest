/* eslint-disable no-unused-vars */
import { deleteReq, get, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * Get list of behalfs of.
 * @param modalActions - Use global modal component to catch errors
 * @param {Int} id - Id of the group whose details are required.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getBehalfs = async (modalActions, id = "") => {
  const url = id ? "/behalfs/" + id : "/behalfs";
  return await get(url).catch((error) =>
    handleError("behalfs", error, modalActions)
  );
};

/**
 * Create a behalf of with its name and default settings passed in payload.
 * @param modalActions - Use global modal component to catch errors
 * @param {Object} payload - The payload passed to the backend.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */

const createBehalf = async (payload, modalActions) =>
  await post("/behalfs", payload).catch((error) =>
    handleError(("behalfs", error, modalActions))
  );

/** Update an existing Group.
 * @param {Object} payload - The payload passed to the backend.
 * @param modalActions
 * @param {Number} id - The id of the group to be updated.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const updateBehalf = async (id, payload, modalActions) =>
  await post("/behalfs/" + id, payload).catch((error) => {
    handleError("behalfs", error, modalActions);
    throw error;
  });

/**
 * Delete a group with a specific id.
 * @param modalActions - Use global modal component to catch errors
 * @param {Int} id - Id of the group to be deleted.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */

const deleteBehalf = async (id, modalActions) =>
  await deleteReq("/behalfs/" + id).catch((error) =>
    handleError(("behalfs", error, modalActions))
  );

const behalfApi = {
  getBehalfs: getBehalfs,
  createBehalf: createBehalf,
  deleteBehalf: deleteBehalf,
  updateBehalf: updateBehalf,
};

export default behalfApi;
