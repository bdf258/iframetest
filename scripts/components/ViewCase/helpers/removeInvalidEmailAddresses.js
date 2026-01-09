/*
Sometimes email addresses are returned from the backend as null.
This helper prevents the front-end from crashing as it expects an object, with at least an email property.
Added checking to make sure there is at least an email property present on each email.
*/

/**
 * removeInvalidEmailAddress cases.
 * @param addresses {Array<{email: String}>} addresses - an array of email addresses
 * @returns {Array<{email: String}>} returns an array of email addresses
 */
export const removeInvalidEmailAddress = (addresses) =>
  (Array.isArray(addresses) ? addresses : [addresses]).filter(
    (address) => address?.email
  );
