import { deleteReq, get, patch, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * Get all the plugins.
 * @param modalActions - Use global modal component to catch errors
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getRssFeeds = async (modalActions, iln) =>
  await get(`/rss_feeds`).catch(
    (error) =>
      handleError(
        iln
          ? iln.gettext("There was an error while fetching RSS Feeds.")
          : "There was an error while fetching Rss Feed.",
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
const saveRssFeed = async (payload, modalActions, iln) =>
  await post(`/rss_feeds`, payload).catch(
    (error) =>
      handleError(
        iln
          ? iln.gettext("There was an error attempting to save RSS Feed.")
          : "There was an error attempting to save RSS Feed.",
        error,
        modalActions
      ) //using same review dates handle error function to handle errors
  );
const editRssFeed = async (payload, modalActions, iln) =>
  await patch(`/rss_feeds`, payload).catch(
    (error) =>
      handleError(
        iln
          ? iln.gettext("There was an error attempting to update RSS Feed.")
          : "There was an error attempting to update RSS Feed.",
        error,
        modalActions
      ) //using same review dates handle error function to handle errors
  );
const deleteRssFeed = async (payload, modalActions, iln) =>
  await deleteReq(`/rss_feeds`, payload).catch(
    (error) =>
      handleError(
        iln
          ? iln.gettext("There was an error attempting to update RSS Feed.")
          : "There was an error attempting to update RSS Feed.",
        error,
        modalActions
      ) //using same review dates handle error function to handle errors
  );

const rssAPI = {
  getRssFeeds,
  saveRssFeed,
  editRssFeed,
  deleteRssFeed,
};

export default rssAPI;
