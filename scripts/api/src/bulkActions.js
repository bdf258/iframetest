import { handleError } from "./util/handleError";
import { post } from "./util/fetch";

/**
 * Add note to selected cases.
 * @param {Object} payload - The payload passed to the backend.
 * @param modalActions - Use global modal component to catch errors.
 * @param {[Number] || []} payload.caseSearch.statusID - An array of status IDs that matching cases should have.
 * @param {Array<Number>} payload.caseSearch.casetypeID - An array of casetype IDs that matching cases should have.
 * @param {Array<Number>} payload.caseSearch.categorytypeID - An array of category IDs that matching cases should have.
 * @param {Array<Number>} payload.caseSearch.contacttypeID - An array of contact type IDs that matching cases should have (stored as enquirytypeID in the database).
 * @param {Array<Number>} payload.caseSearch.assignedToID - an array of caseworker IDs that matching cases should have set as their “assigned to” field.
 * @param {Object<{type: String, from: String, to: String}>} payload.caseSearch.dateRange - an array of caseworker IDs that matching cases should have set as their “assigned to” field.
 * @param {Object<{payload.caseSearch.searchType: String, tagID: Array<Number>}>} [payload.caseSearch.tagged] - An object containing details of tags that cases should have in order to match your case criteria, containing the following keys.
 * @param {Object<{payload.caseSearch.searchType: String, tagID: Array<Number>}>} [payload.caseSearch.notTagged] - An object describing tags that should be excluded from a search.
 * @param {String} payload.caseSearch.fileContents - String representing the file as base64.
 * @param {String} payload.caseSearch.fileName - String representing the filename.
 * @param {String} payload.caseSearch.reference - String representing the file description.
 * @param {String} payload.caseSearch.timestamp - String representing the creation datetime of the file.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */

const bulkAttachFile = async (payload, modalActions, iln) =>
  await post("/cases/bulkactions/attachfile", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to bulk attach a file."
          )
        : "There was an error while attempting to bulk attach a file.",
      error,
      modalActions
    )
  );

/**
 * Attach file to selected cases.
 * @param {Object} payload - The payload passed to the backend.
 * @param modalActions - Use global modal component to catch errors.
 * @param {[Number] || []} payload.caseSearch.statusID - An array of status IDs that matching cases should have.
 * @param {Array<Number>} payload.caseSearch.casetypeID - An array of casetype IDs that matching cases should have.
 * @param {Array<Number>} payload.caseSearch.categorytypeID - An array of category IDs that matching cases should have.
 * @param {Array<Number>} payload.caseSearch.contacttypeID - An array of contact type IDs that matching cases should have (stored as enquirytypeID in the database).
 * @param {Array<Number>} payload.caseSearch.assignedToID - an array of caseworker IDs that matching cases should have set as their “assigned to” field.
 * @param {Object<{type: String, from: String, to: String}>} payload.caseSearch.dateRange - an array of caseworker IDs that matching cases should have set as their “assigned to” field.
 * @param {Object<{payload.caseSearch.searchType: String, tagID: Array<Number>}>} [payload.caseSearch.tagged] - An object containing details of tags that cases should have in order to match your case criteria, containing the following keys.
 * @param {Object<{payload.caseSearch.searchType: String, tagID: Array<Number>}>} [payload.caseSearch.notTagged] - An object describing tags that should be excluded from a search.
 * @param {String} payload.caseSearch.note - String representing the note contents.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const bulkAddNote = async (payload, modalActions, iln) =>
  await post("/cases/bulkactions/addnote", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while attempting to bulk add a note.")
        : "There was an error while attempting to bulk add a note.",
      error,
      modalActions
    )
  );

/**
 * Change status of selected cases.
 * @param {Object} payload - The payload passed to the backend.
 * @param modalActions - Use global modal component to catch errors.
 * @param {[Number] || []} payload.caseSearch.statusID - An array of status IDs that matching cases should have.
 * @param {Array<Number>} payload.caseSearch.casetypeID - An array of casetype IDs that matching cases should have.
 * @param {Array<Number>} payload.caseSearch.categorytypeID - An array of category IDs that matching cases should have.
 * @param {Array<Number>} payload.caseSearch.contacttypeID - An array of contact type IDs that matching cases should have (stored as enquirytypeID in the database).
 * @param {Array<Number>} payload.caseSearch.assignedToID - an array of caseworker IDs that matching cases should have set as their “assigned to” field.
 * @param {Object<{type: String, from: String, to: String}>} payload.caseSearch.dateRange - an array of caseworker IDs that matching cases should have set as their “assigned to” field.
 * @param {Object<{payload.caseSearch.searchType: String, tagID: Array<Number>}>} [payload.caseSearch.tagged] - An object containing details of tags that cases should have in order to match your case criteria, containing the following keys.
 * @param {Object<{payload.caseSearch.searchType: String, tagID: Array<Number>}>} [payload.caseSearch.notTagged] - An object describing tags that should be excluded from a search.
 * @param {String} payload.caseSearch.statusID - Number representing the selected statusID.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const bulkChangeStatus = async (payload, modalActions, iln) =>
  await post("/cases/bulkactions/changestatus", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to bulk change case statuses."
          )
        : "There was an error while attempting to bulk change case statuses.",

      error,
      modalActions
    )
  );

/**
 * Add tags to selected cases.
 * @param {Object} payload - The payload passed to the backend.
 * @param modalActions - Use global modal component to catch errors.
 * @param {[Number] || []} payload.caseSearch.statusID - An array of status IDs that matching cases should have.
 * @param {Array<Number>} payload.caseSearch.casetypeID - An array of casetype IDs that matching cases should have.
 * @param {Array<Number>} payload.caseSearch.categorytypeID - An array of category IDs that matching cases should have.
 * @param {Array<Number>} payload.caseSearch.contacttypeID - An array of contact type IDs that matching cases should have (stored as enquirytypeID in the database).
 * @param {Array<Number>} payload.caseSearch.assignedToID - an array of caseworker IDs that matching cases should have set as their “assigned to” field.
 * @param {Object<{type: String, from: String, to: String}>} payload.caseSearch.dateRange - an array of caseworker IDs that matching cases should have set as their “assigned to” field.
 * @param {Object<{payload.caseSearch.searchType: String, tagID: Array<Number>}>} [payload.caseSearch.tagged] - An object containing details of tags that cases should have in order to match your case criteria, containing the following keys.
 * @param {Object<{payload.caseSearch.searchType: String, tagID: Array<Number>}>} [payload.caseSearch.notTagged] - An object describing tags that should be excluded from a search.
 * @param {[Number] || []} payload.caseSearch.tags - ID's of tags to be added to cases.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const bulkAddTags = async (payload, modalActions, iln) =>
  await post("/cases/bulkactions/addtags", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while attempting to bulk add tag(s).")
        : "There was an error while attempting to bulk add tag(s).",
      error,
      modalActions
    )
  );

/**
 * Send a bulk email based on case search filters.
 * @param {Object} payload - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {String} payload.subject - The text of the email's subject line.
 * @param {String} payload.from - The string that the email is sent on behalf of.
 * @param {String} payload.body - The HTML string of the email's body.
 * @param {Object} payload.caseSearch - The filters of the case search, used to select the cases that are emailed.
 * @param {String} payload.schedule - Timestamp for scheduling bulk email
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const bulkSendEmail = async (payload, modalActions, iln) =>
  await post("/cases/bulkactions/sendemail", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to send a bulk email."
          )
        : "There was an error while attempting to send a bulk email.",
      error,
      modalActions
    )
  );
/**
 * Assign a review date to all cases that match the case search filters.
 * @param {Object} payload - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {String} payload.reviewDate - This must follow the format of MM/DD/YYYY UTC.
 * @param {Object} payload.caseSearch - The filters of the case search, used to select the cases that are emailed.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */

const bulkAddReviewDate = async (payload, modalActions, iln) =>
  await post("/cases/bulkactions/setreviewdate", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to set a bulk review date."
          )
        : "There was an error while attempting to set a bulk review date.",
      error,
      modalActions
    )
  );

/**
 * Clear a review date on all cases that match the case search filters.
 * @param {Object} payload - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {Object} payload.caseSearch - The filters of the case search, used to select the cases that are emailed.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const bulkClearReviewDate = async (payload, modalActions, iln) =>
  await post("/cases/bulkactions/clearreviewdate", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to clear bulk review dates."
          )
        : "There was an error while attempting to clear bulk review dates.",
      error,
      modalActions
    )
  );

/**
 * Bulk change the case details of cases that match the case search filters.
 * @param {Object} payload - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {Number} payload.contactType - (optionial) The id of the new contact type.
 * @param {Number} payload.assignedToID - (optionial) The id of the new assigned user.
 * @param {Number} payload.caseTypeID - (optionial) The id of the new case type.
 * @param {Number} payload.categoryTypeID - (optionial) The id of the new category type.
 * @param {Number} payload.statusID - (optionial) The id of the new status type.
 * @param {Object} payload.caseSearch - The filters of the case search, used to select the cases that have their details updated.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const bulkChangeCaseDetails = async (payload, modalActions, iln) =>
  await post("/cases/bulkactions/details", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to bulk change case details."
          )
        : "There was an error while attempting to bulk change case details.",
      error,
      modalActions
    )
  );

/**
 * Bulk delete the cases that match the cases search and optionally any constituents with 0 cases.
 * @param {Object} payload - The payload passed to the backend.
 * @param {Number} payload.caseSearch - the search criteria for cases
 * @param {Object} payload.deleteOrphan - Delete constituents that end up with 0 cases after the deletion
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const bulkDeleteCases = async (payload, modalActions, iln) =>
  await post("/cases/bulkactions/delete", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while attemping to bulk delete cases")
        : "There was an error while attemping to bulk delete cases",
      error,
      modalActions
    )
  );

const bulkActionApi = {
  bulkAddNote,
  bulkChangeStatus,
  bulkAddTags,
  bulkAttachFile,
  bulkSendEmail,
  bulkAddReviewDate,
  bulkClearReviewDate,
  bulkChangeCaseDetails,
  bulkDeleteCases,
};

export default bulkActionApi;
