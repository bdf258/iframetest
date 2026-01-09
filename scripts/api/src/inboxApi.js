import { get, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * Get list of groups.
 * @param setModalState - Use global modal component to catch errors
 * @param {Int} id - Id of the user whose inbox details are required.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getInboxDetails = async (id, setModalState) => {
  return await get(`/inbox/${id}`).catch((error) =>
    handleError("getGroups", error, setModalState)
  );
};

/** Update inbox delegations.
 * @param {Object} payload - The payload passed to the backend. An array of caseworkers in this case.
 * @param setModalState
 * @param {Number} id - The id of the group to be updated.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const updateInboxDetails = async (id, payload, setModalState) =>
  await post(`/inbox/${id}`, payload).catch((error) =>
    handleError("updateGroup", error, setModalState)
  );

const inboxAPI = {
  getInboxDetails: getInboxDetails,
  updateInboxDetails: updateInboxDetails,
};

export default inboxAPI;
