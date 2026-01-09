import { get, getPDF, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * Search for email templates.
 * @param {Object} payload - The payload passed to the backend.
 * @param {String} payload.term - The search term that must match a template name.
 * @param {Boolean} payload.active - If the template is set to active.
 * @param {Array} payload.columnsToReturn - The columns to return from the DB. Optional.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const searchEmailTemplates = async (payload, modalActions, iln, signal) =>
  await post("/emailtemplates/search", payload, signal).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to search email templates."
          )
        : "There was an error while attempting to search email templates.",
      error,
      modalActions
    )
  );

const getEmailTemplateById = async (id, modalActions, iln) =>
  await get(`/emailtemplates/${id}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to get an email template."
          )
        : "There was an error while attempting to get an email template.",
      error,
      modalActions
    )
  );

const duplicateEmailTemplate = async (id, payload, modalActions) =>
  await post("/emailtemplates/duplicate/" + id, payload).catch((error) =>
    handleError("Unable to duplicate Email Template", error, modalActions)
  );

const proxyDownload = async (url, modalActions) =>
  await getPDF(`/proxy/${url}`).catch((error) =>
    handleError(
      "There was an error while attempting to download the email template.",
      error,
      modalActions
    )
  );

const saveEmailTemplate = async (id, payload, modalActions) =>
  await post(`/emailtemplates/save/${id}`, payload).catch((error) =>
    handleError(
      "There was an error while attempting to save email template.",
      error,
      modalActions
    )
  );

window.duplicateEmailTemplate = duplicateEmailTemplate;

const bulkCasesAPI = {
  searchEmailTemplates: searchEmailTemplates,
  getEmailTemplateById: getEmailTemplateById,
  duplicateEmailTemplate: duplicateEmailTemplate,
  saveEmailTemplate: saveEmailTemplate,
  proxyDownload: proxyDownload,
};

export default bulkCasesAPI;
