import { get } from "./util/fetch";
import { handleError } from "./util/handleError";

/**
 * @public get current array of distinct organisation types
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
export const getOrganisationTypes = async (modalActions, iln) =>
  await get("/organisations/types").catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error searching the electoral roll")
        : "There was an error searching the electoral roll",
      error,
      modalActions
    )
  );

/**
 * @public get current array of distinct connection types
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getConnectionTypes = async (modalActions, iln) =>
  await get("/connectionTypes").catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error searching the electoral roll")
        : "There was an error searching the electoral roll",
      error,
      modalActions
    )
  );

/**
 * @public get current array of distinct role types
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getRoleTypes = async (modalActions, iln) =>
  await get("/roleTypes").catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error searching the electoral roll")
        : "There was an error searching the electoral roll",
      error,
      modalActions
    )
  );

const organisationsAPI = {
  getOrganisationTypes,
  getConnectionTypes,
  getRoleTypes,
};

export default organisationsAPI;
