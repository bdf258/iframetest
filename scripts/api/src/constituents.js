import { deleteReq, get, patch, post, file as uploadFile } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * create a constituent
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const createConstituent = async (payload, modalActions, iln) =>
  await post("/constituents", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to create a constituent."
          )
        : "There was an error while attempting to create a constituent.",
      error,
      modalActions
    )
  );

/**
 * Search constituents
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const constituentsSearch = async (payload, modalActions, iln, signal) =>
  await post("/constituents/search", payload, signal).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to search constituents."
          )
        : "There was an error while attempting to search constituents.",
      error,
      modalActions
    )
  );

/**
 * get a constituents details
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getConstituent = async (id, modalActions, iln, signal) =>
  await get(`/constituents/${id}`, signal).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to get a constituent's details."
          )
        : "There was an error while attempting to get a constituent's details.",
      error,
      modalActions
    )
  );

const deleteGeocode = async (payload, modalActions, iln) =>
  await deleteReq(`/constituent/${payload}/geocode`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to remove a constituent's geocode."
          )
        : "There was an error while attempting to remove a constituent's geocode.",
      error,
      modalActions
    )
  );

const getConstituentContactDetails = async (constituentId, modalActions, iln) =>
  await get(`/constituents/${constituentId}/contactDetails`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to retrieve the constituents contact details."
          )
        : "There was an error while attempting to retrieve the constituents contact details.",
      error,
      modalActions
    )
  );

/**
 * add to a constituents details
 * @param {object} payload - payload based to the backend
 * @param {number} payload.contactTypeID - the contactType ID of the value
 * @param {number} payload.constituentID - the constituent ID
 * @param {string} payload.source - where the contact detail came from
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const addConstituentContactDetail = async (payload, modalActions, iln) =>
  await post("/contactDetails", payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to add contact details to a constituent."
          )
        : "There was an error while attempting to add contact details to a constituent.",
      error,
      modalActions
    )
  );

/**
 * update a constituents details
 * @param {object} payload - payload based to the backend
 * @param {string} payload.value - the value of contact detail
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const updateConstituentContactDetail = async (payload, modalActions, iln) =>
  await patch(`/contactDetails/${payload.id}`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to update a constituent's contact detail."
          )
        : "There was an error while attempting to update a constituent's contact detail.",
      error,
      modalActions
    )
  );

/**
 * delete a constituents details
 * @param {object} payload - payload based to the backend
 * @param {string} payload.id - the contact detail ID
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const deleteConstituentContactDetail = async (payload, modalActions, iln) =>
  await deleteReq(`/contactDetails/${payload.id}`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to delete a constituent's contact detail."
          )
        : "There was an error while attempting to delete a constituent's contact detail.",
      error,
      modalActions
    )
  );

const mergeConstituents = async (
  constituentID,
  newConstituentID,
  precedence,
  modalActions,
  iln
) =>
  await post(`/constituent/${constituentID}/merge`, {
    idToKeep: newConstituentID,
    precedence,
  }).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error merging constituents. Please try again"
          )
        : "There was an error merging constituents. Please try again",
      error,
      modalActions
    )
  );

const getMergeDetails = async (constituentID, modalActions, iln) =>
  await get(`/constituent/${constituentID}/merge`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error getting merging details. Please try again"
          )
        : "There was an error getting merging details. Please try again",
      error,
      modalActions
    )
  );

/**
 * Uploads constituents from a csv file
 * @param {object} payload - The payload sent to the backend
 * @param {file} payload.file - The csv file
 * @param {object} payload.matchOn - The type of check to be used for matching to existing constituents
 * @param {object} payload.columns - The configuration containing which columns to import
 * @param {function} modalActions - a func that sets the global modal content, used for errors.
 * @param {function} iln - a func that handles international translation, used for errors.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const uploadConstituents = async ({ file, ...payload }, modalActions, iln) =>
  await uploadFile(`/constituents/initRequest`, file, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error uploading your constituents.")
        : "There was an error uploading your constituents.",
      error,
      modalActions
    )
  );

const updateConstituent = async (updateConstituent, modalActions, iln) =>
  await patch(
    `/constituents/${updateConstituent?.id}`,
    updateConstituent
  ).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error updating the constituent")
        : "There was an error updating the constituent",
      error,
      modalActions
    )
  );

const constituents = {
  constituentsSearch,
  deleteGeocode,
  getConstituent,
  getConstituentContactDetails,
  addConstituentContactDetail,
  updateConstituentContactDetail,
  deleteConstituentContactDetail,
  mergeConstituents,
  getMergeDetails,
  uploadConstituents,
  createConstituent,
  updateConstituent,
};

export default constituents;
