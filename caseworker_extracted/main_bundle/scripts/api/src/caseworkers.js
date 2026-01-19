import { get } from "./util/fetch";
import { handleError } from "./util/handleError";

/**
 * get all caseworkers.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getCaseworkers = async (modalActions, iln) =>
  await get("/caseworkers").catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while searching for Caseworkers.")
        : "There was an error while searching for Caseworkers.",
      error,
      modalActions
    )
  );

const getCaseworkersForCase = async (caseID, modalActions, iln) =>
  await get(`/caseworkers/forCase/${caseID}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while searching for Caseworkers.")
        : "There was an error while searching for Caseworkers.",
      error,
      modalActions
    )
  );

const getAllCaseworkers = async (modalActions, iln) =>
  await get("/caseworkers/all").catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while searching for Caseworkers.")
        : "There was an error while searching for Caseworkers.",
      error,
      modalActions
    )
  );
const caseworkersAPI = {
  getCaseworkers,
  getCaseworkersForCase,
  getAllCaseworkers,
};

export default caseworkersAPI;
