import { get, patch } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * Create a new unique tag.
 * @param {Object} payload - The payload passed to the backend.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {String} payload.tag - The text of the tag to be created.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const archiveSurvey = async (id, modalActions, iln) =>
  await patch(`/surveys/${id}/archive`, {}).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to archive the survey."
          )
        : "There was an error while attempting to archive the survey.",
      error,
      modalActions
    )
  );

const unarchiveSurvey = async (id, modalActions, iln) =>
  await patch(`/surveys/${id}/unarchive`, {}).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to restore the survey."
          )
        : "There was an error while attempting to archive the survey.",
      error,
      modalActions
    )
  );

const getSurveys = async (modalActions, iln) =>
  await get("/surveys").catch((error) => {
    handleError(
      iln
        ? iln.gettext("There was an error retrieving the surveys.")
        : "There was an error retrieving the surveys.",
      error,
      modalActions
    );
  });

const getDoorknockSurveys = async (modalActions, iln) =>
  await get("/doorknocking/surveys").catch((error) => {
    handleError(
      iln
        ? iln.gettext("There was an error retrieving the surveys.")
        : "There was an error retrieving the surveys.",
      error,
      modalActions
    );
  });

export default {
  archiveSurvey,
  unarchiveSurvey,
  getSurveys,
  getDoorknockSurveys,
};
