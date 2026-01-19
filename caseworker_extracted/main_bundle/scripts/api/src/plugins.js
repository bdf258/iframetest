import { get, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * Get all the plugins.
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getPlugins = async (modalActions, iln) =>
  await get(`/plugins`).catch(
    (error) =>
      handleError(
        iln
          ? iln.gettext("There was an error while fetching plugins.")
          : "There was an error while fetching plugins.",
        error,
        modalActions
      ) //using same review dates handle error function to handle errors
  );

/**
 * Save plugin details.
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const savePlugin = async (pluginID, payload, modalActions, iln) =>
  await post(`/plugins/${pluginID}`, payload).catch(
    (error) =>
      handleError(
        iln
          ? iln.gettext("There was an error attempting to save plugins.")
          : "There was an error attempting to save plugins.",
        error,
        modalActions
      ) //using same review dates handle error function to handle errors
  );

const pluginsAPI = {
  getPlugins,
  savePlugin,
};

export default pluginsAPI;
