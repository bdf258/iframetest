import { post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * @public set locale.
 * @param {String} locale - the country code of the locale to use.
 * @param {object} iln - translation context
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
export const setLocale = async (locale, iln, modalActions) => {
  return await post(`/locale/set`, {
    locale,
  }).catch((error) =>
    handleError(
      iln
        ? iln.getText("There was an error retrieving the contact list")
        : "There was an error retrieving the contact list",
      error,
      modalActions
    )
  );
};

const localeAPI = {
  setLocale: setLocale,
};

export default localeAPI;
