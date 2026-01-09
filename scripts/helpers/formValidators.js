/** @module form validation helpers */

/**
 * Exposed interface: Matches input against regex to check it is composed of only numbers.
 * @public
 * @param {string} value - value to check.
 * @returns {boolean} isNumber - is the input a number.
 */
const isNumber = (value) => {
  return /^\d+$/.test(value);
};

/**
 * Exposed interface: Checks length of value against length @param.
 * @param {string} value - the value to check length against.
 * @param {number} length - the length to check the value against.
 * @returns {boolean}
 */

const isValidLength = (value, length) => {
  return value.toString().length >= length;
};

/**
 * Exposed interface: Checks length of tag.
 * White space at the start and end of a tag do not contribute to total length.
 * @param {string} value - the value to check length against.
 * @param {number} length - the length to check the value against.
 * @returns {boolean}
 */

const isTagValidLength = (value, length) => {
  return value.toString().trim().length >= length;
};
const isFlagValidLength = (value, length) => {
  return value.toString().trim().length >= length;
};

const isInvalidDateTime = (dateTime) =>
  !dateTime || dateTime === "0000-00-00" || dateTime === "0000-00-00 00:00:00";

export {
  isNumber,
  isValidLength,
  isTagValidLength,
  isFlagValidLength,
  isInvalidDateTime,
};
