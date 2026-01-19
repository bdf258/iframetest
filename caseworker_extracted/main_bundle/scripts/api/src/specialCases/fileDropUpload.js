import { handleError } from "../util/handleError";

// Contains all file upload HTTP logic.
// File uploads are not handled by the generic front-end HTTP handler.

const developmentFileUploadUrl = "http://localhost:8080";
const develop =
  window.location.host.includes("localhost") ||
  window.location.host.includes("cloudworkstations");
const protocol = window.location.protocol;
const domainName = location.host.substring(location.host.indexOf(".") + 1);

const subdomain = (locale) => {
  switch (locale) {
    case "en_CA": {
      return "uploader-ca";
    }
    case "en_KY": {
      return "uploader-ca";
    }
    case "en_GB":
    case "cy_GB":
    case "en_AU": {
      return "uploader";
    }
    default: {
      return "uploader";
    }
  }
};
const getBaseUrl = (locale) => {
  if (develop)
    return (
      developmentFileUploadUrl
      )
  if (!locale) throw new Error("Locale is required for file uploads");
  return `${protocol}//${subdomain(locale)}.${domainName}`;
};

/**
 * The main api wrapper that deals with authentication
 * @private
 */
const rawApi = async (options, baseUrl) => {
  // Try to access the JWT auth token from localStorage
  const token = window.localStorage.getItem("token") || "";
  // If we have found a token then we can inject it into the request header
  if (token.length > 0) {
    options.headers = Object.assign({}, options.headers, {
      Authorization: token,
    });
  }
  // Call the endpoint and wait for the response
  const response = await fetch(baseUrl, options);

  if (!response.ok) {
    // If something went wrong throw the response text which should be an error message
    throw response;
  }

  // If everything is ok then update the auth token with the new one from the API if it exists
  if (response.headers.has("Authorization")) {
    window.localStorage.setItem("token", response.headers.get("Authorization"));
  }
  // Then return the response
  return response;
};

/**
 * Simple fetch API wrapper that only ever returns parsed JSON responses.
 * @private
 * @param {Object} options - The options that will be passed to the request.
 * @param {string} baseUrl - The URL to use when uploading files.
 * @param {Object} options.headers - Any headers for the request, this is required even if empty.
 * @param {String} options.method - The method to be used for the request.
 * @returns {Promise} A promise that resolves to returned JSON data.
 * @throws {String} An error message returned by the API
 */
const callApi = async (options, baseUrl) => {
  const response = await rawApi(options, baseUrl);
  return response.json();
};

/**
 * Exposed interface to callApi that uses a POST request. Data will be passed through JSON.stringify and the 'application/json' Content-Type header will be applied.
 * @param {Object} data - The data to be posted to the API.
 * @returns {Promise} A promise that resolves to returned JSON data.
 * @throws {String} An error message returned by the API.
 */
const postForm = async ({ file, locale, ...rest }) => {
  const fd = new FormData();
  fd.append("file", file);
  Object.entries(rest).forEach(([key, value]) => fd.append(key, value));
  const baseUrl = getBaseUrl(locale);

  return await callApi(
    {
      method: "POST",
      body: fd,
    },
    baseUrl
  );
};

/**
 * Upload a file from a drop event
 * @param {Object} payload - The payload passed to the backend.
 * @param {Number} payload.caseID - The ID of the case.
 * @param {Number} payload.mailboxID - The ID of the constituent.
 * @param {Number} payload.file - The file to be uploaded.
 * @param {Number} payload.subdomain - The subdomain of the installation.
 * @param {Number} payload.locale - The locale of the user.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const uploadDroppedFile = async (payload, modalActions, iln) => {
  return await postForm(payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while trying to upload a dropped file."
          )
        : "There was an error while trying to upload a dropped file.",

      error,
      modalActions
    )
  );
};

export default { uploadDroppedFile };
