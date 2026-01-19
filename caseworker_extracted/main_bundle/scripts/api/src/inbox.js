import { get, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * Bulk create a case for each selected email.
 * @param modalActions - Use global modal component to catch errors
 * @param iln - User facing string translation
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const createBulkCasesFromEmails = async (payload, modalActions, iln) =>
  await post("/inbox/bulkActions/createCases", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error attempting to create bulk cases.")
        : "There was an error attempting to create bulk cases.",
      error,
      modalActions
    )
  );

/**
 * Bulk assign inbox items to a caseworker.
 * @param modalActions - Use global modal component to catch errors
 * @param iln - User facing string translation
 * @param payload - the payload sent to the backend
 * @param payload.caseworkerID - the ID of the caseworker
 * @param payload.itemIDs - the items that will have their assigned caseworker updated
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const bulkAssignInboxItemsToCaseworker = async (payload, modalActions, iln) =>
  await post("/inbox/bulkActions/assignCaseworker", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error attempting to create bulk cases.")
        : "There was an error attempting to create bulk cases.",
      error,
      modalActions
    )
  );

/**
 * Bulk assign inbox items to a caseworker.
 * @param payload - the payload sent to the backend
 * @param modalActions - Use global modal component to catch errors
 * @param iln - User facing string translation
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const inboxSearch = async (payload, modalActions, iln) =>
  await post("/inbox/search", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error attempting to search for inbox items."
          )
        : "There was an error attempting to search for inbox items.",
      error,
      modalActions
    )
  );

/**
 * get any potential constituent and electoral roll matches for an email
 * @param payload - the payload sent to the backend
 * @param payload.name {string} - name on the email
 * @param payload.email {string} - email address on the email
 * @param modalActions - Use global modal component to catch errors
 * @param iln - User facing string translation
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getConstituentMatches = async (payload, modalActions, iln) =>
  await post("/inbox/constituentMatches", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error attempting to find constituent matches"
          )
        : "There was an error attempting to find constituent matches",
      error,
      modalActions
    )
  );

/**
 * Bulk assign inbox items to a caseworker.
 * @param modalActions - Use global modal component to catch errors
 * @param iln - User facing string translation
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getInboxes = async (modalActions, iln) =>
  await get("/inbox/getInboxes").catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error attempting to get the available inboxes."
          )
        : "There was an error attempting to get the available inboxes.",
      error,
      modalActions
    )
  );

/**
 * triggerAutomations
 * @param {Object} payload - The payload passed to the backend.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const triggerAutomation = async (payload, modalActions, iln) =>
  await post("/inbox/triggerAutomation", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error running email automation.")
        : "There was an error attempting running email automation.",
      error,
      modalActions
    )
  );
const inboxAPI = {
  createBulkCasesFromEmails,
  bulkAssignInboxItemsToCaseworker,
  inboxSearch,
  getInboxes,
  triggerAutomation,
  getConstituentMatches,
};

export default inboxAPI;
