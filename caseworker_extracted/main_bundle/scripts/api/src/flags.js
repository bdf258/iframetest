import { deleteReq, get, patch, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * Create a new unique flag.
 * @param {Object} payload - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {String} payload.flag - The text of the flag to be created.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const createFlag = async (payload, modalActions) =>
  await post("/flags", payload).catch((error) =>
    handleError(
      "There was an error while attempting to create a flag.",
      error,
      modalActions
    )
  );

/**
 * Get a flag based on it's unique id.
 * @param {Number} id - The ID of the flag you want to fetch the text for.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getFlag = async (id, modalActions) =>
  await get(`/flags/${id}`).catch((error) =>
    handleError(
      "There was an error while attempting to get a flag.",
      error,
      modalActions
    )
  );

/**
 * Update an existing flags text.
 * @param {Object} payload - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {Number} payload.id - The id of the flag to be updated.
 * @param {String} payload.flag - The new text of the  updated flag.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const updateFlag = async (payload, modalActions) =>
  await patch("/flags", payload).catch((error) => {
    handleError(
      "There was an error while attempting to update a flag.",
      error,
      modalActions
    );
    throw error;
  });

/**
 * Delete an existing flag.
 * @param {Number} id - The id of the flag to be deleted.
 * @param modalActions
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const deleteFlag = async (id, modalActions) =>
  await deleteReq(`/flags/${id}`).catch((error) =>
    handleError(
      "There was an error while attempting to delete a flag.",
      error,
      modalActions
    )
  );

/**
 * Search all flags.
 * @param {Object} payload - The payload passed to the backend.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const searchFlags = async (payload, modalActions) =>
  await post("/flags/search", payload).catch((error) =>
    handleError(
      "There was an error while attempting to search flags.",
      error,
      modalActions
    )
  );

/**
 * Merge multiple flags into one flag.
 * @param {Object} payload - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {Array} payload.idsToBeMerged - An array of flags to be merged.
 * @param {Object} payload.flagToMergeInto - The object of the master flag.
 * @param {Number} payload.flagToMergeInto.id - The id of the master flag.
 * @param {String} payload.flagToMergeInto.flag - The text of the existing flag.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */

const mergeFlags = async (payload, modalActions) =>
  await post("/manageflags/merge", payload).catch((error) =>
    handleError(
      "There was an error while attempting to merge flags.",
      error,
      modalActions
    )
  );

/**
 * Delete multiple flags en masse.
 * @param {Object} payload - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const deleteBulkFlags = async (payload, modalActions) =>
  await post("/manageflags/delete", payload).catch((error) =>
    handleError(
      "There was an error while attempting to bulk delete a flag.",
      error,
      modalActions
    )
  );
/**
 * Adds Flags to Segments.
 * @param {Object} payload - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const flagsToSegment = async (payload, modalActions) =>
  await post("/flags/flagsToSegment", payload).catch((error) =>
    handleError(
      "There was an error while attempting to bulk delete a flag.",
      error,
      modalActions
    )
  );

const flagsAPI = {
  createFlag: createFlag,
  getFlag: getFlag,
  updateFlag: updateFlag,
  deleteFlag: deleteFlag,
  searchFlags: searchFlags,
  mergeFlags: mergeFlags,
  deleteBulkFlags: deleteBulkFlags,
  flagsToSegment: flagsToSegment,
};

export default flagsAPI;
