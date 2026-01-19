/* global loginTimer, popupAutoLogout */
/// * global BASE_URL */
/** @module fetch */

import { addEvent } from "./logging";

const BASE_URL =
  window.location.protocol + "//" + window.location.host + "/api/ajax";

/**
 * The main api wrapper that deals with authentication and URL formatting
 * @private
 */
const rawApi = async (endpoint, options) => {
  // Try to access the JWT auth token from localStorage
  const token = window.localStorage.getItem("token") || "";
  // If we have found a token then we can inject it into the request header
  options.headers = Object.assign({}, options.headers, {
    Authorization: token && token.length > 0 ? token : "",
  });

  // Call the endpoint and wait for the response
  const response = await fetch(BASE_URL + endpoint, options);

  if (!response.ok) {
    // If something went wrong throw the response text which should be an error message
    addEvent({
      datetime: new Date().toISOString(),
      event: "HTTP Fail",
    });
    throw response;
  } else {
    // otherwise clear auto logout timeout
    if (
      typeof loginTimer !== "undefined" &&
      typeof popupAutoLogout !== "undefined"
    ) {
      clearTimeout(loginTimer);
      addEvent({
        datetime: new Date().toISOString(),
        event: "Cleared timeout",
      });

      // eslint-disable-next-line no-global-assign
      loginTimer = setTimeout(function () {
        addEvent({
          datetime: new Date().toISOString(),
          event: "Showed Auto Logout - fetch.js",
        });
        popupAutoLogout();
      }, 1801000);
    }
  }

  // If everything is ok then update the auth token with the new one from the API if it exists
  if (response.headers.has("Authorization")) {
    window.localStorage.setItem("token", response.headers.get("Authorization"));
    addEvent({
      datetime: new Date().toISOString(),
      event: "Updated token",
    });
  }
  // Then return the response
  return response;
};

/**
 * Simple fetch API wrapper that only ever returns parsed JSON responses.
 * @private
 * @param {String} endpoint - The URI to send the request to.
 * @param {Object} options - The options that will be passed to the request.
 * @param {Object} options.headers - Any headers for the request, this is required even if empty.
 * @param {String} options.method - The method to be used for the request.
 * @returns {Promise} A promise that resolves to returned JSON data.
 * @throws {String} An error message returned by the API
 */
const callApi = async (endpoint, options) => {
  const response = await rawApi(endpoint, options);
  return response.json();
};

/**
 * Exposed interface to callApi that uses a GET request.
 * @param {String} url - The URL to be requested.
 * @returns {Promise} A promise that resolves to returned JSON data.
 * @throws {String} An error message returned by the API.
 */
const get = async (url, signal) => await callApi(url, { headers: {}, signal });

/**
 * Exposed interface to callApi that uses a POST request. Data will be passed through JSON.stringify and the 'application/json' Content-Type header will be applied.
 * @param {String} url - The URL to be requested.
 * @param {Object} data - The data to be posted to the API.
 * @returns {Promise} A promise that resolves to returned JSON data.
 * @throws {String} An error message returned by the API.
 */
const post = async (url, data, signal) =>
  await callApi(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify(data),
  });

/**
 * Exposed interface to callApi that uses a PUT request. Data will be passed through JSON.stringify and the 'application/json' Content-Type header will be applied.
 * @param {String} url - The URL to be requested.
 * @param {Object} data - The data to be posted to the API.
 * @returns {Promise} A promise that resolves to returned JSON data.
 * @throws {String} An error message returned by the API.
 */
const put = async (url, data, signal) =>
  await callApi(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify(data),
  });

/**
 * Exposed interface to callApi that uses a PATCH request. Data will be passed through JSON.stringify and the 'application/json' Content-Type header will be applied.
 * @param {String} url - The URL to be requested.
 * @param {Object} data - The data to be posted to the API.
 * @returns {Promise} A promise that resolves to returned JSON data.
 * @throws {String} An error message returned by the API.
 */
const patch = async (url, data, signal) =>
  await callApi(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify(data),
  });

/**
 * Exposed interface to callApi that uses a DELETE request.
 * @function get
 * @param {String} url - The URL to be requested.
 * @returns {Promise} A promise that resolves to returned JSON data.
 * @throws {String} An error message returned by the API.
 */
const deleteReq = async (url, data, signal) =>
  await callApi(url, {
    method: "DELETE",
    headers: {},
    signal,
    body: JSON.stringify(data),
  });

/**
 * Exposed interface to callApi that uses a POST request to send a File as FormData with the ID 'file'.
 * @param {String} url - The URL to be requested.
 * @param {File} f - The file to be PUT to the API.
 * @returns {Promise} A promise that resolves to returned JSON data.
 * @throws {String} An error message returned by the API.
 */
const file = async (url, f, data = {}, signal) => {
  // The file is sent as FormData to the endpoint. This is due to the nuances of Flask and how it handles file uploads.
  const body = new FormData();
  body.append("file", f);
  body.append("json", JSON.stringify(data));
  return await callApi(url, {
    method: "POST",
    headers: {},
    signal,
    body,
  });
};

/**
 * Authentication function that will authenticate against the API and return the auth JWT.
 * @param {Object} credentials - The authentication credentials to be used.
 * @param {String} credentials.username - The username to authenticate against.
 * @param {String} credentials.passwordHash - A SHA256 hex digest of the password.
 * @param {String} credentials.legacyHash - An MD5 hex digest of the password.
 * @param {String} credentials.otp - The One Time Passcode to authenticate with.
 * @returns {Promise} A promise that resolves to the response from the authentication endpoint.
 * @throws {String} An error message returned by the API.
 */
const authenticate = async (credentials) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  };

  const response = await fetch(BASE_URL + "auth", options);
  if (!response.ok) {
    // If something went wrong throw the response text which should be an error message
    throw await response.text();
  }
  return await response.text();
};

/**
 * Unauthenticated POST function that will issue a POST request without any authentication.
 * Typically used for new user setup or password resets.
 * @param {String} url - The URL to be requested.
 * @param {Object} data - The data to be posted to the API.
 * @returns {Promise} A promise that resolves to returned JSON data.
 * @throws {String} An error message returned by the API.
 */
const unauthPost = async (url, data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(BASE_URL + url, options);

  if (!response.ok) {
    throw await response.text();
  }

  return response.json();
};

/**
 * A function to download files from the API
 * @param {String} url - The URL to be requested.
 * @param {Object} data - The data to be posted to the API.
 * @returns {Promise} A promise that resolves to returned Blob data.
 * @throws {String} An error message returned by the API.
 */
const downloadFile = async (url) => {
  const response = await rawApi(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.blob();
};

/**
 * A function to download a pdf from the API
 * @param {String} url - The URL to be requested.
 * @param {Object} data - The data to be posted to the API.
 * @returns {Promise} A promise that resolves to returned Blob data.
 * @throws {String} An error message returned by the API.
 */
const getPDF = async (url, data) => {
  const response = await rawApi(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/pdf",
    },
    body: JSON.stringify(data),
  });
  return await response.blob();
};

export {
  get,
  post,
  put,
  patch,
  deleteReq,
  file,
  authenticate,
  unauthPost,
  downloadFile,
  getPDF,
};
