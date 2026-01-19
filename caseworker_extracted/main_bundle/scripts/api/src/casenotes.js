import { deleteReq, get, patch, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * Get a single casenote
 * @param {string} casenoteID - The ID of the casenote you'd like to get.
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getCasenote = async (casenoteID, modalActions, iln) =>
  await get(`/casenotes/${casenoteID}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while trying to fetch a casenote.")
        : "There was an error while trying to fetch a casenote.",
      error,
      modalActions
    )
  );

/**
 * Get all the casenotes assigned to a case
 * @param {string} caseID - The ID of the case you'd like to get the casenotes for.
 * @param {object} pagination - object of params for controlling pagination
 * @param {int} pagination.page - The page being requested
 * @param {int} pagination.limit - The number of results per page
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getAllCasenotes = async (caseID, pagination = {}, modalActions, iln) =>
  await get(
    `/cases/${caseID}/casenotes?${
      pagination.page !== undefined ? `page=${pagination.page}` : ""
    }${pagination.limit ? `&limit=${pagination.limit}` : ""}${
      pagination.orderBy ? `&orderBy=${pagination.orderBy}` : ""
    }`
  ).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while trying to fetch all a case's casenotes."
          )
        : "There was an error while trying to fetch all a case's casenotes.",
      error,
      modalActions
    )
  );

/**
 * Get the notes assigned to a case
 * @param {string} caseID - The ID of the case you'd like to get the casenotes for.
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getCaseNotes = async (caseID, modalActions, iln) =>
  await get(`/cases/${caseID}/notes`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while trying to fetch a case's notes."
          )
        : "There was an error while trying to fetch a case's notes.",
      error,
      modalActions
    )
  );

/**
 * Get the appointments assigned to a case
 * @param {string} caseID - The ID of the case you'd like to get the casenotes for.
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getCaseAppointments = async (caseID, modalActions, iln) =>
  await get(`/cases/${caseID}/appointments`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while trying to fetch appointment casenotes."
          )
        : "There was an error while trying to fetch appointment casenotes.",
      error,
      modalActions
    )
  );

/**
 * Get the files assigned to a case
 * @param {string} caseID - The ID of the case you'd like to get the casenotes for.
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getCaseFiles = async (caseID, modalActions, iln) =>
  get(`/cases/${caseID}/files`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while trying to fetch file casenotes."
          )
        : "There was an error while trying to fetch file casenotes.",
      error,
      modalActions
    )
  );

/**
 * Get the emails assigned to a case
 * @param {string} caseID - The ID of the case you'd like to get the casenotes for.
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getCaseEmails = async (caseID, modalActions, iln) =>
  get(`/cases/${caseID}/emails`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while trying to fetch email casenotes."
          )
        : "There was an error while trying to fetch email casenotes.",
      error,
      modalActions
    )
  );

/**
 * Get the letters assigned to a case
 * @param {string} caseID - The ID of the case you'd like to get the casenotes for.
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getCaseLetters = async (caseID, modalActions, iln) =>
  get(`/cases/${caseID}/letters`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while trying to fetch letter casenotes."
          )
        : "There was an error while trying to fetch letter casenotes.",
      error,
      modalActions
    )
  );

/**
 * Get the review dates assigned to a case
 * @param {string} caseID - The ID of the case you'd like to get the casenotes for.
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getCaseReviewDates = async (caseID, modalActions, iln) =>
  await get(`/cases/${caseID}/reviewDates`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while trying to fetch appointment casenotes."
          )
        : "There was an error while trying to fetch appointment casenotes.",
      error,
      modalActions
    )
  );

/**
 * Create a note on a case
 * @param {string} caseID - The ID of the case you'd like to create the note on.
 * @param {object} payload - The payload passed to the backend.
 * @param {string} payload.note - The text of the note.
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const createNote = async (caseID, payload, modalActions, iln) =>
  await post(`/cases/${caseID}/notes`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while trying to create a note.")
        : "There was an error while trying to create a note.",
      error,
      modalActions
    )
  );

const updateCasenote = async (noteID, payload, modalActions, iln) =>
  await patch(`/casenotes/${noteID}`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while trying to update a casenote.")
        : "There was an error while trying to update a casenote.",
      error,
      modalActions
    )
  );

const deleteCasenote = async (noteID, modalActions, iln) =>
  await deleteReq(`/casenotes/${noteID}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while trying to delete a casenote.")
        : "There was an error while trying to delete a casenote.",
      error,
      modalActions
    )
  );

const getCaseAllCaseFiles = async (caseId, modalActions, iln) =>
  await get(`/cases/${caseId}/attachments`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while trying to get the case files.")
        : "There was an error while trying to get the case files.",
      error,
      modalActions
    )
  );

export default {
  getCasenote,
  getAllCasenotes,
  getCaseNotes,
  getCaseAppointments,
  getCaseFiles,
  getCaseEmails,
  getCaseLetters,
  getCaseReviewDates,
  createNote,
  updateCasenote,
  deleteCasenote,
  getCaseAllCaseFiles,
};
