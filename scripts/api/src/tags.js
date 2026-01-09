import { deleteReq, get, patch, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * Create a new unique tag.
 * @param {Object} payload - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {String} payload.tag - The text of the tag to be created.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const createTag = async (payload, modalActions, iln) =>
  await post("/tags", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while attempting to create a tag.")
        : "There was an error while attempting to create a tag.",
      error,
      modalActions
    )
  );

/**
 * Get a tag based on it's unique id.
 * @param {Number} id - The ID of the tag you want to fetch the text for.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getTag = async (id, modalActions, iln) =>
  await get(`/tags/${id}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while attempting to get a tag.")
        : "There was an error while attempting to get a tag.",
      error,
      modalActions
    )
  );

/**
 * Update an existing tags text.
 * @param {Object} payload - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {Number} payload.id - The id of the tag to be updated.
 * @param {String} payload.tag - The new text of the  updated tag.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const updateTag = async (payload, modalActions, iln) =>
  await patch("/tags", payload).catch((error) => {
    handleError(
      iln
        ? iln.gettext("There was an error while attempting to update a tag.")
        : "There was an error while attempting to update a tag.",
      error,
      modalActions
    );
    throw error;
  });

/**
 * Delete an existing tag.
 * @param {Number} id - The id of the tag to be deleted.
 * @param modalActions
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const deleteTag = async (id, modalActions, iln) =>
  await deleteReq(`/tags/${id}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while attempting to delete a tag.")
        : "There was an error while attempting to delete a tag.",
      error,
      modalActions
    )
  );

/**
 * Search all tags.
 * @param {Object} payload - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {String} payload.term - The search term that results must match.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const searchTags = async (payload, modalActions, iln) =>
  await post("/tags/search", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while attempting to search tags.")
        : "There was an error while attempting to search tags.",
      error,
      modalActions
    )
  );

/**
 * Merge multiple tags into one tag.
 * @param {Object} payload - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {Array} payload.idsToBeMerged - An array of tags to be merged.
 * @param {Object} payload.tagToMergeInto - The object of the master tag.
 * @param {Number} payload.tagToMergeInto.id - The id of the master tag.
 * @param {String} payload.tagToMergeInto.tag - The text of the existing tag.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */

const mergeTags = async (payload, modalActions, iln) =>
  await post("/managetags/merge", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while attempting to merge tags.")
        : "There was an error while attempting to merge tags.",
      error,
      modalActions
    )
  );

/**
 * Delete multiple tags en masse.
 * @param {Object} payload - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const deleteBulkTags = async (payload, modalActions, iln) =>
  await post("/managetags/delete", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to bulk delete a tag."
          )
        : "There was an error while attempting to bulk delete a tag.",
      error,
      modalActions
    )
  );

/**
 * Delete a tag silently if it is not used on the system.
 * @param {string} id - The ID of the tag that should be deleted.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const deleteTagIfNotUsedSilent = async (id, modalActions, iln) =>
  await deleteReq(`/tags/silent/${id}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while attempting to delete a tag.")
        : "There was an error while attempting to delete a tag.",
      error,
      modalActions
    )
  );

const tagsAPI = {
  createTag,
  getTag,
  updateTag,
  deleteTag,
  searchTags,
  mergeTags,
  deleteBulkTags,
  deleteTagIfNotUsedSilent,
};

export default tagsAPI;
