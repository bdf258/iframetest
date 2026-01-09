/** @module query string helpers */

/**
 * Exposed interface: URL currently has a query string
 * @public
 * @returns {Boolean}
 */

export const hasQueryString = () => {
  return !!window.location.search;
};

/**
 * Exposed interface: Removes query string from URL
 * @public
 */

export const clearQueryString = () => {
  const url = window.location.toString();
  if (url.indexOf("?") > 0) {
    const urlWithoutQueryString = url.substring(0, url.indexOf("?"));
    window.history.replaceState({}, document.title, urlWithoutQueryString);
  }
};

/**
 * Exposed interface: Get the current query string parameters as a Map
 * @public
 * @returns {Map} params - Query string parameters as a Map
 */

export const getQueryStringParamMap = () => {
  const queryString = window.location.search;
  const searchParamIterator = new URLSearchParams(queryString).entries();
  const params = new Map();

  for (const [key, value] of searchParamIterator) {
    params.set(key, value);
  }

  return params;
};

const queryString = {
  getQueryStringParamMap: getQueryStringParamMap,
  hasQueryString: hasQueryString,
  clearQueryString: clearQueryString,
};

export default queryString;
