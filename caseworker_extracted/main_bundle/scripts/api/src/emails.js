import { deleteReq, get, patch, post } from "./util/fetch";

import { handleError } from "./util/handleError";
import { parseEmailsForLegacyEmailFormatting } from "./util/parseEmailLegacyFormatting";

/**
 * send test email.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const sendTestEmail = async (payload, modalActions) =>
  await post("/emails/sendtest", payload).catch((error) =>
    handleError(
      "There was an error while attempting to send a test email.",
      error,
      modalActions
    )
  );
/**
 * check mergecodes in Email.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const checkEmailMergeCodes = async (payload, modalActions) =>
  await post("/emails/checkEmailMergeCodes", payload).catch((error) =>
    handleError(
      "There was an error while checking email merge codes.",
      error,
      modalActions
    )
  );
/**
 * get email body from template.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getEmailBody = async (payload, modalActions) =>
  await post("/emails/getEmailBody", payload).catch((error) =>
    handleError(
      "There was an error while attempting to get email body.",
      error,
      modalActions
    )
  );

/**
 * send email.
 * @param {String} emailId - The id of the email that must be sent.iated with.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const sendEmail = async (emailId, modalActions, iln) =>
  await post(`/emails/${emailId}/send`, "").catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while attempting to send the email.")
        : "There was an error while attempting to send the email.",
      error,
      modalActions
    )
  );

/**
 * get email by case id.
 * @param {string} emailId - id of the email to get.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getEmail = async (emailId, modalActions, iln) => {
  return parseEmailsForLegacyEmailFormatting(get(`/emails/${emailId}`)).catch(
    (error) =>
      handleError(
        iln
          ? iln.gettext(
              "There was an error while trying to retrieve the email."
            )
          : "There was an error while trying to retrieve the email.",
        error,
        modalActions
      )
  );
};

/**
 * update existing draft email.
 * @param {Object} payload - The payload that is passed to the backend.
 * @param {Array<String>} payload.to - Email addresses to send to.
 * @param {Array<String>} payload.cc - Email addresses to cc.
 * @param {Array<String>} payload.bcc - Email addresses to bcc.
 * @param {String} payload.from - Email address the email is from.
 * @param {String} payload.htmlBody - The HTML body of the email.
 * @param {String} payload.subject - The subject of the email.
 * @param {String} payload.caseID - The Id of the case that the email is associated with.
 * @param {string} payload.emailID - The id of the email to update.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const updateEmail = async (payload, modalActions, iln) => {
  return await patch(`/emails/${payload.emailID}`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while updating the saved email.")
        : "There was an error while updating the saved email.",
      error,
      modalActions
    )
  );
};

/**
 * save draft email.
 * @param {Object} payload - The payload that is passed to the backend.
 * @param {Array<String>} payload.to - Email addresses to send to.
 * @param {Array<String>} payload.cc - Email addresses to cc.
 * @param {Array<String>} payload.bcc - Email addresses to bcc.
 * @param {String} payload.from - Email address the email is from.
 * @param {String} payload.htmlBody - The HTML body of the email.
 * @param {String} payload.subject - The subject of the email.
 * @param {String} payload.caseID - The Id of the case that the email is associated with.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const saveDraftEmail = async (payload, modalActions, iln) => {
  return await post("/emails", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while saving the email.")
        : "There was an error while saving the email.",
      error,
      modalActions
    )
  );
};

/**
 * update existing draft email.
 * @param {Object} payload - The payload that is passed to the backend.
 * @param {Array<String>} payload.to - Email addresses to send to.
 * @param {Array<String>} payload.cc - Email addresses to cc.
 * @param {Array<String>} payload.bcc - Email addresses to bcc.
 * @param {String} payload.from - Email address the email is from.
 * @param {String} payload.htmlBody - The HTML body of the email.
 * @param {String} payload.subject - The subject of the email.
 * @param {String} payload.caseID - The Id of the case that the email is associated with.
 * @param {string} payload.emailID - The id of the email to update.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const updateDraftEmail = async (payload, modalActions, iln) => {
  return await patch(`/emails/${payload.emailID}`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while updating the saved email.")
        : "There was an error while updating the saved email.",
      error,
      modalActions
    )
  );
};

/**
 * upload an attachment to an email.
 * @param {Object} payload - The payload that is passed to the backend.
 * @param {string} payload.emailId - Id of the email to attach the file to.
 * @param {Object} payload.attachment - File to attach.
 * @param {string} payload.attachment.content - Base64 encoding of the files content.
 * @param {string} payload.attachment.name - Name of the file.
 * @param {string} payload.attachment.type - The mime-type of the file.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const addAttachment = async (payload, modalActions, iln) => {
  return await post(
    `/emails/${payload.emailId}/attach`,
    payload.attachment
  ).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while adding the attachment to the email."
          )
        : "There was an error while adding the attachment to the email.",
      error,
      modalActions
    )
  );
};

/**
 * attach an existing file to an email.
 * @param {'caseFile' | 'letter' | 'emailAttachment' } type - The payload that is passed to the backend.
 * @param {string} emailId - Id of the email to attach the file to.
 * @param {string} attachmentId - Id of the file to attach.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const attachExistingFileToEmail = async (
  type,
  attachmentId,
  emailId,
  modalActions,
  iln
) => {
  type = type === "file" ? "caseFile" : type;
  let payload = {
    type: type,
    [`${type}ID`]: attachmentId,
  };
  if (type === "letter") payload = Object.assign(payload, { signed: true });
  return await post(`/emails/${emailId}/attach`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attaching the %1 to the email.",
            type
          )
        : `There was an error while attaching the ${type} to the email.`,
      error,
      modalActions
    )
  );
};

const attachedSignedLetterToEmail = async (
  attachmentId,
  emailId,
  modalActions,
  iln
) => {
  return await post(`/emails/${emailId}/attach`, {
    type: "letter",
    signed: true,
    letterID: attachmentId,
  }).catch((error) =>
    handleError(
      iln.gettext(
        "There was an error while attaching the letter to the email."
      ),
      error,
      modalActions
    )
  );
};

/**
 * delete an attachment to on email.
 * @param {string} attachmentId - The id of the attachment to delete.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const deleteAttachment = async (attachmentId, modalActions, iln) => {
  return await deleteReq(`/emails/attachments/${attachmentId}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was a error while trying to delete the attachment."
          )
        : "There was a error while trying to delete the attachment.",
      error,
      modalActions
    )
  );
};

/**
 * get specific email attachment content.
 * @param {string} attachmentId - The id of the attachment to get.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getAttachment = async (attachmentId, modalActions, iln) => {
  return await get(`/emails/attachments/${attachmentId}/content`).catch(
    (error) =>
      handleError(
        iln
          ? iln.gettext(
              "There was a error while trying to delete the attachment."
            )
          : "There was a error while trying to delete the attachment.",
        error,
        modalActions
      )
  );
};

/**
 * delete an email.
 * @param {string} emailId - The id of the email to delete.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const deleteEmail = async (emailId, modalActions, iln) => {
  return await deleteReq(`/emails/${emailId}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was a error while trying to delete the email.")
        : "There was a error while trying to delete the email.",
      error,
      modalActions
    )
  );
};

/**
 * Mark a casenote as actioned or not
 * @param {string} casenoteID - The ID of the casenote you want to set as actioned or unactioned
 * @param {boolean} actioned - If the casenote is to be set to actioned (true) or unactioned (false)
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const updateEmailActioned = async (emailID, actioned, modalActions, iln) =>
  await patch(`/emails/${emailID}`, {
    actioned,
  }).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to mark an inbox item as actioned."
          )
        : "There was an error while attempting to mark an inbox item as actioned.",
      error,
      modalActions
    )
  );

/**
 * Mark a casenote as actioned or not
 * @param {string} casenoteID - The ID of the casenote you want to set as actioned or unactioned
 * @param {boolean} actioned - If the casenote is to be set to actioned (true) or unactioned (false)
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const updateEmailAssignedTo = async (emailID, assignedTo, modalActions, iln) =>
  await patch(`/emails/${emailID}`, {
    assignedTo,
  }).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to change an inbox item's assigned to."
          )
        : "There was an error while attempting to change an inbox item's assigned to.",
      error,
      modalActions
    )
  );

/**
 * Search emails
 * @param modalActions - Use global modal component to catch errors
 * @param {Number} page - The page to return the results for
 * @param {Number} limit - Number of results returned
 * @param {String} subject - Number of results returned
 * @param {String} to - Number of results returned
 * @param {String} from - Number of results returned
 * @param {String} body - Value to use when searching the body field
 * @param {Array} type - List of types to search to limit the search to
 * @param {Array} caseWorkerIds - Caseworker Id’s to limit the search to
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const emailSearch = async (searchParams, modalActions, iln, signal) =>
  await post("/emails/search", searchParams, signal).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while trying to search for emails.")
        : "There was an error while trying to search for emails.",
      error,
      modalActions
    )
  );

const noOfScheduledEmails = async (emailID, modalActions, iln) =>
  await get(`/emails/${emailID}/cancel`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while trying to get the number of scheduled emails."
          )
        : "There was an error while trying to get the number of scheduled emails.",
      error,
      modalActions
    )
  );

/**
 * Cancels the scheduled emails batch of which this email is part of
 * @param {string} emailID - The ID of the scheduled email in that batch.
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */

const cancelScheduledEmail = async (emailID, modalActions, iln) =>
  await post(`/emails/${emailID}/cancel`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while trying to cancel scheduled emails."
          )
        : "There was an error while trying to cancel scheduled emails.",
      error,
      modalActions
    )
  );

/**
 * bulk mark emails as actioned
 * @param {Object} payload - The payload passed to the backend.
 * @param {Object} payload.emails - Array of email IDs.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const bulkMarkAsActioned = async (payload, modalActions, iln) =>
  await post("/emails/bulkactions/markasactioned", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error attempting to create bulk cases.")
        : "There was an error attempting to create bulk cases.",
      error,
      modalActions
    )
  );

/**
 * bulk deletes emails
 * @param {Object} payload - The payload passed to the backend.
 * @param {Object} payload.emails - Array of email IDs.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const bulkDeleteEmails = async (payload, modalActions, iln) =>
  await post("/emails/bulkactions/delete", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error attempting to bulk delete emails.")
        : "There was an error attempting to bulk delete emails.",
      error,
      modalActions
    )
  );

const emailAPI = {
  getAttachment,
  sendTestEmail,
  getEmail,
  saveDraftEmail,
  updateDraftEmail,
  addAttachment,
  updateEmail,
  sendEmail,
  deleteAttachment,
  attachExistingFileToEmail,
  attachedSignedLetterToEmail,
  deleteEmail,
  updateEmailActioned,
  updateEmailAssignedTo,
  getEmailBody,
  checkEmailMergeCodes,
  emailSearch,
  noOfScheduledEmails,
  cancelScheduledEmail,
  bulkMarkAsActioned,
  bulkDeleteEmails,
};

export default emailAPI;
