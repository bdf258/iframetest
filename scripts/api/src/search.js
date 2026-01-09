import { handleError } from "./util/handleError";
import { post } from "./util/fetch";

/**
 * Configurable endpoint for universal searching.
 * @param {Object} payload - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const search = async (payload, modalActions, iln) =>
  await post("/search", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while attempting a search.")
        : "There was an error while attempting a search.",
      error,
      modalActions
    )
  );

const searchAPI = {
  search,
};

export default searchAPI;
