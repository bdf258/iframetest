import { get, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * Get all membership types.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @param setModalState - Use global modal component to catch errors
 * @throws {String} An error message returned by the API.
 */
const getMembershipTypes = async (setModalState) =>
  await get("/membership/branches/types").catch((error) =>
    handleError("getMembershipTypes", error, setModalState)
  );

/**
 * Get membership report.
 * @param {Object} payload - The payload passed to the backend.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @param setModalState - Use global modal component to catch errors
 * @throws {String} An error message returned by the API.
 */
const getMembershipReport = async (payload, setModalState, setLoading, btn) =>
  await post("/membership/report", payload).catch((error) => {
    setLoading(false);
    btn.disabled = false;
    handleError("getMembershipReport", error, setModalState);
  });

const getMembershipDetails = async (payload, setModalState, setLoading, btn) =>
  await post("/membership/memberDetails", payload).catch((error) => {
    setLoading(false);
    btn.disabled = false;
    handleError("getMembershipDetails", error, setModalState);
  });

const membershipAPI = {
  getMembershipTypes: getMembershipTypes,
  getMembershipReport: getMembershipReport,
  getMembershipDetails: getMembershipDetails,
};

export default membershipAPI;
