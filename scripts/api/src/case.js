import { deleteReq, get, patch, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * Update case details
 * @param {Object} payload - The payload passed to the backend.
 * @param {String} payload.term - The search term that must match a template name.
 * @param {Boolean} payload.active - If the template is set to active.
 * @param {Array} payload.columnsToReturn - The columns to return from the DB. Optional.
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const updateCase = async (caseID, payload, modalActions, iln) =>
  await patch(`/cases/${caseID}`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while trying to update a case's details."
          )
        : "There was an error while trying to update a case's details.",
      error,
      modalActions
    )
  );

const deleteCase = async (caseID, modalActions, iln) =>
  await deleteReq(`/cases/${caseID}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while trying to delete a case.")
        : "There was an error while trying to delete a case.",
      error,
      modalActions
    )
  );

/**
 * Create a new case.
 * @param {Object} payload - The payload passed to the backend.
 * @param {String} payload.reviewDate - (optional )The date string of when the case is up for review.
 * @param {String} payload.contactTypeID - The ID of the contact type of the case.
 * @param {String} payload.constituentID - The ID of the constituent this case belongs to.
 * @param {String} payload.caseTypeID - The ID of the case type of the case.
 * @param {String} payload.statusID - The ID of the status of the case.
 * @param {String} payload.categoryTypeID - The ID of the category of the case.
 * @param {String} payload.assignedToID - The ID of the user assigned to the case.
 * @param {String} payload.summary - The text of the summary of the case.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const createCase = async (payload, modalActions, iln) =>
  await post("/cases", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while trying to create a case.")
        : "There was an error while trying to create a case.",
      error,
      modalActions
    )
  );

const getCase = async (caseID, modalActions, iln) =>
  await get(`/cases/${caseID}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while trying to get a case's details."
          )
        : "There was an error while trying to get a case's details.",
      error,
      modalActions
    )
  );

/**
 * Create a new case.
 * @param {Object} payload - The payload passed to the backend.
 * @param {Number} currentCase - The case that will have it's casenotes moved to another case
 * @param {Number} mergeWithID - The master case that will have other casenotes merged into it
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const mergeCase = async (currentCase, mergeWithID, modalActions, iln) =>
  await post(`/cases/${mergeWithID}/merge`, {
    mergeCaseID: currentCase,
  }).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while trying to create a case.")
        : "There was an error while trying to create a case.",
      error,
      modalActions
    )
  );

const getCasesStatistics = async (caseTypeID, iln) =>
  await get(`/cases/statistics/casetype/${caseTypeID}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error retrieving the statistics")
        : "There was an error retrieving the statistics.",
      error
    )
  );
const viewCaseAPI = {
  getCase,
  createCase,
  updateCase,
  deleteCase,
  mergeCase,
  getCasesStatistics,
};

export default viewCaseAPI;
