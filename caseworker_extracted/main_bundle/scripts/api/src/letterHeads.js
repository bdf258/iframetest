import { handleError } from "./util/handleError";
import { post } from "./util/fetch";

/**
 * Search for email templates.
 * @param {Object} payload - The payload passed to the backend.
 * @param {String} payload.term - The search term that must match a template name.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const duplicateLetterHead = async (id, payload, modalActions) =>
  await post("/letterheads/duplicate/" + id, payload).catch((error) =>
    handleError("Unable to duplicate LetterHead", error, modalActions)
  );

const searchLetterHeads = async (payload, modalActions) =>
  await post("/letterheads/search", payload).catch((error) =>
    handleError(
      "There was an error while attempting to search letterheads.",
      error,
      modalActions
    )
  );

const letterHeadAPI = {
  duplicateLetterHead: duplicateLetterHead,
  searchLetterHeads: searchLetterHeads,
};

export default letterHeadAPI;
