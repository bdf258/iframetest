import { handleError } from "./util/handleError";
import { post } from "./util/fetch";

/**
 * Search for suburbs.
 * @param {String} payload - The search term that must match a suburb name.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {String} iln - Translation context.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const suburbSearch = async (payload, modalActions, iln) =>
  await post("/suburb/search", payload).catch((error) =>
    handleError(
      iln.gettext("There was an error while searching"),
      error,
      modalActions
    )
  );

export { suburbSearch };
