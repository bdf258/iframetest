import { handleError } from "./util/handleError";
import { post } from "./util/fetch";

/**
 * @public get matching addresses for auto complete source
 * @param {object} iln - translation context
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
export const getAutoCompleteOptions = async (
  payload,
  modalActions,
  iln,
  signal
) => {
  return await post(`/emails/address`, payload, signal).catch((error) =>
    error.status == 404
      ? []
      : handleError(
          iln
            ? iln.gettext("There was an error getting matching email addresses")
            : "There was an error getting matching email addresses",
          error,
          modalActions
        )
  );
};

const emailAddressesAPI = {
  getAutoCompleteOptions,
};

export default emailAddressesAPI;
