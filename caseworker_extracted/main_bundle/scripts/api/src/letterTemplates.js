import { get, post } from "./util/fetch";

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
const searchLetterTemplates = async (payload, modalActions, iln) =>
  await post("/lettertemplates/search", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to search letter templates."
          )
        : "There was an error while attempting to search letter templates.",
      error,
      modalActions
    )
  );

const duplicateTemplate = async (id, payload, modalActions) =>
  await post("/lettertemplates/duplicate/" + id, payload).catch((error) =>
    handleError("Unable to duplicate LetterTemplate", error, modalActions)
  );

const getLetterTemplate = async (id, modalActions, iln) =>
  await get(`/lettertemplates/${id}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while retrieving the email tempalte.")
        : "There was an error while retrieving the email tempalte.",
      error,
      modalActions
    )
  );

const searchLetterHeaders = async (payload, modalActions, iln) =>
  await post("/letterheads/search", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error retrieving the letter heads.")
        : "There was an error retrieving the letter heads.",
      error,
      modalActions
    )
  );

const updateLetterTemplateRestrictions = async (
  id,
  payload,
  modalActions,
  iln
) =>
  await post(`/lettertemplates/updateRestrictions/${id}`, payload).catch(
    (error) =>
      handleError(
        iln
          ? iln.gettext("There was an error updating restrictions")
          : "There was an error updating restrictions",
        error,
        modalActions
      )
  );

window.duplicateLetterTemplate = duplicateTemplate;

const getLetterHeader = async (payload, modalActions) =>
  await get(`/letterheads/${payload}`).catch((error) => {
    handleError(
      "There was an error while retrieving the email header template"
    ),
      error,
      modalActions;
  });

const letterTemplatesAPI = {
  getLetterHeader: getLetterHeader,
  searchLetterTemplates: searchLetterTemplates,
  getLetterTemplate: getLetterTemplate,
  searchLetterHeaders: searchLetterHeaders,
  duplicateTemplate: duplicateTemplate,
  updateLetterTemplateRestrictions: updateLetterTemplateRestrictions,
};

export default letterTemplatesAPI;
