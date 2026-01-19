import { get } from "./util/fetch";
import { handleError } from "./util/handleError";

/**
 * Get Do not contact types.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getDoNotContactTypes = async (modalActions, iln) =>
  await get("/donotcontacttypes").catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to get do not contact types."
          )
        : "There was an error while attempting to get do not contact types.",
      error,
      modalActions
    )
  );

const typesAPI = {
  getDoNotContactTypes,
};

export default typesAPI;
