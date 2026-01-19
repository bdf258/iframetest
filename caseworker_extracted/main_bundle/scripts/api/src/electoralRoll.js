import { handleError } from "./util/handleError";
import { post } from "./util/fetch";

/**
 * @public get contactList by id.
 * @param {String} contactListId - Id of the contact list to get.
 * @param {Object} searchTerm - searchTerm.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {function} iln - context for translating text of error messages.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
export const searchElectoralRoll = async (payload, modalActions, iln) =>
  await post(`/electoralroll/search`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error searching the electoral roll")
        : "There was an error searching the electoral roll",
      error,
      modalActions
    )
  );

const electoralRollAPI = {
  searchElectoralRoll,
};

export default electoralRollAPI;
