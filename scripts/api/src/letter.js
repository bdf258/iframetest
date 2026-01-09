import { get, getPDF, patch, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * get a letter.
 * @param {string} letterId - The id of the letter to retrieve.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */

const getLetter = async (letterId, modalActions, iln) =>
  await get(`/letters/${letterId}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while attempting to get the letter.")
        : "There was an error while attempting to get the letter.",
      error,
      modalActions
    )
  );

/**
 * save a letter.
 * @param {Object} payload - The payload that is passed to the backend.
 * @param {string} payload.caseId - The caseId that the letter is attached to.
 * @param {string} payload.letterheadId - id of the letter's letter head.
 * @param {string} payload.reference - The letters reference.
 * @param {string} payload.letterContent - The content of the body of the letter.
 * @param {string} payload.footerContent - The content of the letters footer.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */

const saveLetter = async (payload, modalActions, iln) => {
  const {
    caseId: caseID,
    letterheadId,
    letterRef: reference,
    letterContent: text = "",
    footerContent: footer = "",
    autosave,
  } = payload;

  payload = {
    caseID: Number.parseInt(caseID),
    letterheadId: Number.parseInt(letterheadId),
    reference,
    ...(text && { text }),
    ...(footer && { footer }),
    ...(autosave && { autosave }),
  };

  return await post("/letters", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while attempting to save the letter.")
        : "There was an error while attempting to save the letter.",
      error,
      modalActions
    )
  );
};

/**
 * Updates letter.
 * @param modalActions - Use global modal component to catch errors
 * @param reviewID - id of the case the review dates is conected on.
 * @param {Object} payload - An array with all the review date objects.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const updateLetter = async (reviewID, payload, modalActions, iln) => {
  const {
    caseId: caseID,
    letterheadId,
    letterRef: reference,
    letterContent: text,
    footerContent: footer,
    autosave,
  } = payload;

  payload = {
    caseID: Number.parseInt(caseID),
    letterheadId: Number.parseInt(letterheadId),
    reference,
    ...((text || text === "") && { text }),
    ...((footer || footer === "") && { footer }),
    ...(autosave && { autosave }),
  };

  return await patch(`/letters/${reviewID}`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while attempting to update a letter.")
        : "There was an error while attempting to update a letter.",
      error,
      modalActions
    )
  );
};

/**
 * Get a letter as a PDF file
 * @param {string} letterID - The ID of the letter you want to fetch
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getLetterAsPDF = async (letterID, modalActions, iln) =>
  await getPDF(`/letters/${letterID}/pdf`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while trying to fetch a letter PDF.")
        : "There was an error while trying to fetch a letter PDF.",
      error,
      modalActions
    )
  );

/**
 * Get a signed letter as a PDF file
 * @param {string} letterID - The ID of the letter you want to fetch
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getSignedLetterAsPDF = async (letterID, modalActions, iln) =>
  await getPDF(`/letters/${letterID}/pdf/signed`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while trying to fetch a letter PDF.")
        : "There was an error while trying to fetch a letter PDF.",
      error,
      modalActions
    )
  );

const letterAPI = {
  getLetter,
  saveLetter,
  updateLetter,
  getLetterAsPDF,
  getSignedLetterAsPDF,
};

export default letterAPI;
