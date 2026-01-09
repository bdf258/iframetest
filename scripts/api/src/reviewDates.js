import { deleteReq, get, patch, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * Create a new date object.
 * @param modalActions - Use global modal component to catch errors
 * @param {object} payload - The payload passed to the backend
 * @param {string} payload.reviewDate - String of the date
 * @param {string} payload.note - The note to appear on the review date
 * @param {number} payload.caseID - the case id that the review is assigned to
 * @param {number} payload.assignedTo - the user id that the review is assigned to
 * @param {function} modalActions - Use global modal component to catch errors
 * @returns {payload} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const createReviewDate = async (payload, modalActions, iln) =>
  await post(`/reviewDates`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to add a review date."
          )
        : "There was an error while attempting to add a review date.",
      error,
      modalActions
    )
  );
const createReviewDateForCase = async (caseID, modalActions, iln) =>
  await post(`/reviewDates/forCase/${caseID}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to add a review date."
          )
        : "There was an error while attempting to add a review date.",
      error,
      modalActions
    )
  );

/**
 * Get all the date objects.
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getReviewDate = async (reviewID, modalActions, iln) =>
  await get(`/reviewDates/${reviewID}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to get a review date."
          )
        : "There was an error while attempting to get a review date.",
      error,
      modalActions
    )
  );
const getReviewDatesForCase = async (caseID, modalActions, iln) =>
  await get(`/reviewDates/forCase/${caseID}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to get a review date."
          )
        : "There was an error while attempting to get a review date.",
      error,
      modalActions
    )
  );

/**
 * Updates review dates.
 * @param modalActions - Use global modal component to catch errors
 * @param caseID - id of the case the review dates is conected on.
 * @param {Object} payload - An array with all the review date objects.
 * @param {string} payload.reviewDate - String of the date
 * @param {string} payload.note - The note to appear on the review date
 * @param {number} payload.caseID - the case id that the review is assigned to
 * @param {number} payload.assignedTo - the user id that the review is assigned to
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const updateReviewDate = async (reviewID, payload, modalActions, iln) =>
  await patch(`/reviewDates/${reviewID}`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to update a review date."
          )
        : "There was an error while attempting to update a review date.",
      error,
      modalActions
    )
  );
const updateReviewDateForCase = async (caseID, payload, modalActions, iln) =>
  await post(`/reviewDates/forCase/${caseID}/update`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to update a review date."
          )
        : "There was an error while attempting to update a review date.",
      error,
      modalActions
    )
  );

/**
 * Mark a review date as completed.
 * @param modalActions - Use global modal component to catch errors
 * @param reviewID - id of the review date object.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const completeReviewDate = async (reviewID, modalActions, iln) =>
  await post(`/reviewDates/${reviewID}/complete`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to mark a review date as complete."
          )
        : "There was an error while attempting to mark a review date as complete.",
      error,
      modalActions
    )
  );

/**
 * Mark a review date as in complete.
 * @param modalActions - Use global modal component to catch errors
 * @param reviewID - id of the review date object.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const incompleteReviewDate = async (reviewID, modalActions, iln) =>
  await post(`/reviewDates/${reviewID}/incomplete`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to mark a review date as incomplete."
          )
        : "There was an error while attempting to mark a review date as incomplete.",
      error,
      modalActions
    )
  );

/**
 * Delete a review date.
 * @param modalActions - Use global modal component to catch errors
 * @param caseID - id of the case the review dates is conected on.
 * @param id - id of the review date object.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */

const deleteReviewDates = async (reviewID, modalActions, iln) =>
  await deleteReq(`/reviewDates/${reviewID}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to delete a review date."
          )
        : "There was an error while attempting to delete a review date.",
      error,
      modalActions
    )
  );
const deleteReviewDate = deleteReviewDates;

const reviewDatesAPI = {
  getReviewDate,
  createReviewDate,
  getReviewDatesForCase,
  createReviewDateForCase,
  completeReviewDate,
  incompleteReviewDate,
  deleteReviewDates,
  updateReviewDateForCase,
  deleteReviewDate,
  updateReviewDate,
};

export default reviewDatesAPI;
