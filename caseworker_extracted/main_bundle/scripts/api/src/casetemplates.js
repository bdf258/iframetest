import { deleteReq, get, patch, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * get a case template by id.
 * @param {number} id - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getCaseTemplate = async (id, modalActions, iln) =>
  await get(`/casetemplates/${id}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to get a case template."
          )
        : "There was an error while attempting to get a case template.",
      error,
      modalActions
    )
  );

/**
 * create a new case template.
 * @param {Object} payload - The payload passed to the backend.
 * @param {string} payload.name - The name of the template.
 * @param {Object} payload.template - The template object of casetypes etc, any shape is accepted.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const createCaseTemplate = async (payload, modalActions, iln) =>
  await post("/casetemplates", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to create a new case template."
          )
        : "There was an error while attempting to create a new case template.",
      error,
      modalActions
    )
  );

/**
 * update an existing case template.
 * @param {number} id - The payload passed to the backend.
 * @param {Object} payload - The payload passed to the backend.
 * @param {string} payload.name - The name of the template.
 * @param {Object} payload.template - The template object of casetypes etc, any shape is accepted.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const updateCaseTemplate = async (id, payload, modalActions, iln) =>
  await patch(`/casetemplates/${id}`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to update a case template."
          )
        : "There was an error while attempting to update a case template.",
      error,
      modalActions
    )
  );

/**
 * delete a case template by id.
 * @param {number} id - the id of the template to delete.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const deleteCaseTemplate = async (id, modalActions, iln) =>
  await deleteReq(`/casetemplates/${id}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to delete a case template."
          )
        : "There was an error while attempting to delete a case template.",
      error,
      modalActions
    )
  );

/**
 * create a new case template.
 * @param {object} payload - The payload passed to the backend
 * @param {string} payload.columnsToReturn - The selected DB columns, all if empty. (id,name,createdBy,updatedBy, template,created,updated)
 * @param {string} payload.pageNo - Which "page" would you like to be returned
 * @param {string} payload.resultsPerPage - The number of results returned per page
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const searchCaseTemplates = async (payload, modalActions, iln, signal) =>
  await post("/casetemplates/search", payload, signal).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to search for case templates."
          )
        : "There was an error while attempting to search for case templates.",
      error,
      modalActions
    )
  );

const caseTemplatesAPI = {
  getCaseTemplate,
  createCaseTemplate,
  updateCaseTemplate,
  deleteCaseTemplate,
  searchCaseTemplates,
};

export default caseTemplatesAPI;
