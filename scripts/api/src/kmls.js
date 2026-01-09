import { deleteReq, get, patch, file as uploadFile } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * @public upload a kml.
 * @param {object} kml - the country code of the locale to use.
 * @param {string} kml.name - a human name for the area the kml covers.
 * @param {blob} kml.file - the kml file blob.
 * @param {object} iln - translation context
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
export const getKMLs = async (modalActions, iln) => {
  return await get(`/kmls`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error attempting to get all kmls")
        : "There was an error attempting to get all kmls",
      error,
      modalActions
    )
  );
};

/**
 * @public upload a kml.
 * @param {object} kml - the country code of the locale to use.
 * @param {string} kml.name - a human name for the area the kml covers.
 * @param {blob} kml.file - the kml file blob.
 * @param {object} iln - translation context
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
export const createKML = async ({ file, ...data }, modalActions, iln) => {
  return await uploadFile(`/kmls`, file, data).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error attempting to create a kml")
        : "There was an error attempting to create a kml",
      error,
      modalActions
    )
  );
};

/**
 * @public update a kml.
 * @param {number} id - the country code of the locale to use.
 * @param {object} iln - translation context
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
export const updateKML = async (kml, modalActions, iln) => {
  return await patch(`/kmls`, kml).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error attempting to delete a kml")
        : "There was an error attempting to delete a kml",
      error,
      modalActions
    )
  );
};

/**
 * @public delete a kml.
 * @param {number} id - the country code of the locale to use.
 * @param {object} iln - translation context
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
export const deleteKML = async (id, modalActions, iln) => {
  return await deleteReq(`/kmls`, { id }).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error attempting to delete a kml")
        : "There was an error attempting to delete a kml",
      error,
      modalActions
    )
  );
};
