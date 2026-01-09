import { get, post } from "./util/fetch";

import { handleError } from "./util/handleError";
import { renameCaseworkerFromApi } from "../../helpers/renameAdminUser";

/**
 * Search cases.
 * @param {Object} payload - The payload passed to the backend.
 * @param modalActions - Use global modal component to catch errors.
 * @param {[Number] || []} payload.statusID - An array of status IDs that matching cases should have.
 * @param {Array<Number>} payload.casetypeID - An array of casetype IDs that matching cases should have.
 * @param {Array<Number>} payload.categorytypeID - An array of category IDs that matching cases should have.
 * @param {Array<Number>} payload.contacttypeID - An array of contact type IDs that matching cases should have (stored as enquirytypeID in the database).
 * @param {Array<Number>} payload.assignedToID - an array of caseworker IDs that matching cases should have set as their “assigned to” field.
 * @param {Object<{type: String, from: String, to: String}>} payload.dateRange - an array of caseworker IDs that matching cases should have set as their “assigned to” field.
 * @param {Object<{searchType: String, tagID: Array<Number>}>} [payload.tagged] - An object containing details of tags that cases should have in order to match your case criteria, containing the following keys.
 * @param {String} [payload.orderBy] -If no orderBy is provided then cases returned will be ordered by created date.
 * @param {String} [payload.orderByDirection] - Sets the sort order for returned columns. If not supplied will default to “DESC”. Must be either  “ASC” or “DESC”.
 * @param {Object<{searchType: String, tagID: Array<Number>}>} [payload.notTagged] - An object describing tags that should be excluded from a search.
 * @param {Number} payload.pageNo - the page number of results to return. The number of results per page is defined by the “resultsPerPage” key.
 * @param {Number} payload.resultsPerPage - The number of results per page to be returned. Cannot be empty or zero.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const searchCases = async (payload, modalActions, iln) =>
  await post("/cases/search", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while searching for cases.")
        : "There was an error while searching for cases.",
      error,
      modalActions
    )
  );

/**
 * Get a list of current caseworkers
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */

const caseWorkers = async (modalActions, iln) =>
  await get("/caseworkers")
    .then(
      (caseworkers) =>
        new Promise((resolve) =>
          resolve(renameCaseworkerFromApi(caseworkers, "name"))
        )
    )
    .catch((error) =>
      handleError(
        iln
          ? iln.gettext("There was an error while searching for Caseworkers.")
          : "There was an error while searching for Caseworkers.",
        error,
        modalActions
      )
    );

const searchCasesById = async (searchTerm, modalActions, iln) =>
  await get(`/cases/search/${searchTerm}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while searching by ID for cases.")
        : "There was an error while searching by ID for cases.",
      error,
      modalActions
    )
  );

const casesApi = {
  searchCases,
  caseWorkers,
  searchCasesById,
};

export default casesApi;
