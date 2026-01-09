import { deleteReq, get, patch, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * Get email signature by id.
 * @param {number} id - the id of the email signature to be fetched.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {function} iln - a func that handles translations.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getEmailSignature = async (id, modalActions, iln) =>
  await get(`/emailsignatures/${id}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to fetch an email signature."
          )
        : "There was an error while attempting to fetch an email signature.",
      error,
      modalActions
    )
  );

/**
 * update the logged in user's preferences.
 * @param {object} payload - the object to be passed to the backend.
 * @param {string} payload.email - the email address associated with this signature.
 * @param {string} payload.signature - the text of the signature.
 * @param {number} payload.caseworkerID - the id of the caseworker that the signature belongs to.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {function} iln - a func that handles translations.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const createEmailSignature = async (payload, modalActions, iln) =>
  await post("/emailsignatures", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to create an email signature."
          )
        : "There was an error while attempting to create an email signature.",
      error,
      modalActions
    )
  );

/**
 * Update email signature by id.
 * @param {object} payload - the object to be passed to the backend.
 * @param {string} payload.id - the id of the signautre to be updated.
 * @param {string} payload.email - the email address associated with this signature.
 * @param {string} payload.signature - the text of the signature.
 * @param {number} payload.caseworkerID - the id of the caseworker that the signature belongs to.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {function} iln - a func that handles translations.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const updateEmailSignature = async (payload, modalActions, iln) =>
  await patch(`/emailsignatures/${payload.id}`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to update an email signature."
          )
        : "There was an error while attempting to fetch an email signature.",
      error,
      modalActions
    )
  );

/**
 * Delete user email signature by id
 * @param {number} id - the id of the email signature to be deleted.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {function} iln - a func that handles translations.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const deleteEmailSignature = async (id, modalActions, iln) =>
  await deleteReq(`/emailsignatures/${id}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to delete an email signature."
          )
        : "There was an error while attempting to delete an email signature.",
      error,
      modalActions
    )
  );

export default {
  getEmailSignature,
  createEmailSignature,
  updateEmailSignature,
  deleteEmailSignature,
};
