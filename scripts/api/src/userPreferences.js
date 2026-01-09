import { deleteReq, get, patch, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * Get the logged in user's preferences.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {function} iln - a func that handles translations.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getUserPreferences = async (modalActions, iln) =>
  await get("/user/preferences").catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to fetch user preferences."
          )
        : "There was an error while attempting to fetch user preferences.",
      error,
      modalActions
    )
  );

/**
 * update the logged in user's preferences.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {function} iln - a func that handles translations.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const updateUserPreferences = async (payload, modalActions, iln) =>
  await patch("/user/preferences", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to update user preferences."
          )
        : "There was an error while attempting to update user preferences.",
      error,
      modalActions
    )
  );

/**
 * Sends an email to the provided email address to validate it.
 * @param {string} email - The email address requiring validation.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {function} iln - a func that handles translations.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const requestSendFromAddress = async (email, modalActions, iln) =>
  await post("/emails/from", { email }).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to request permission to send on behalf of an email address."
          )
        : "There was an error while attempting to request permission to send on behalf of an email address.",
      error,
      modalActions
    )
  );

/**
 * Validates that permission has been provided for the email adress to be used as a send from address.
 * @param {string} uuid - The code provided in the email sent to the email address.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {function} iln - a func that handles translations.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const validateSendFromAddress = async (uuid, modalActions, iln) =>
  await post("/emails/from/validate", { uuid }).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to validate permission to send on behalf of an email address."
          )
        : "There was an error while attempting to validate permission to send on behalf of an email address.",
      error,
      modalActions
    )
  );

/**
 * Removes a send from address
 * @param {string} email - The email to be removed.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {function} iln - a func that handles translations.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const removeSendFromAddress = async (email, modalActions, iln) =>
  await deleteReq("/emails/from", { email }).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to remove a send from email address."
          )
        : "There was an error while attempting to remove a send from email address.",
      error,
      modalActions
    )
  );

export default {
  getUserPreferences,
  updateUserPreferences,
  requestSendFromAddress,
  validateSendFromAddress,
  removeSendFromAddress,
};
