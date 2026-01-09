import { get, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * @public get contact list config.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {function} iln - context for translating text of error messages.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
export const getContactList = async (modalActions, iln) => {
  return await get("/contactLists").catch((error) =>
    handleError(
      iln
        ? iln.getText("There was an error retrieving the contact list")
        : "There was an error retrieving the contact list",
      error,
      modalActions
    )
  );
};

/**
 * @public get contactList by id.
 * @param {String} contactListId - Id of the contact list to get.
 * @param {Object} searchTerm - searchTerm.
 * @param {function} modalActions - a func that sets the global modal content.
 * @param {function} iln - context for translating text of error messages.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
export const searchContactLists = async (
  contactListId,
  searchTerm,
  modalActions,
  iln,
  signal
) => {
  return await post(
    `/contactLists/${contactListId}/search`,
    {
      term: searchTerm,
    },
    signal
  ).catch((error) =>
    handleError(
      iln
        ? iln.getText("There was an error retrieving the contact list")
        : "There was an error retrieving the contact list",
      error,
      modalActions
    )
  );
};

const contactsAPI = {
  getContactList: getContactList,
  searchContactLists: searchContactLists,
};

export default contactsAPI;
