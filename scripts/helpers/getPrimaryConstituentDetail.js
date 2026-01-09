/**
 * Searches an array of objects for the object with a "primary"
 * key of true and returns the .value or an empty string
 */
const getPrimaryConstituentContactDetail = (array) => {
  if (!Array.isArray(array)) return "";

  const contact = array.find((item) => item?.primary);

  return contact?.value || "";
};

export default getPrimaryConstituentContactDetail;
