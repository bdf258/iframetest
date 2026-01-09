/**
 * @public Exposed interface: Adds left padding as zeros to a value.
 * @param {string} value - The value to add padding and prefix to.
 * @param {number} length - The total length of output with padding excluding prefix length.
 * @param {string=} [prefix] - Added at the start of value before padding.
 * @returns {string} paddedValue - Value with optional prefix and padding in zeros to a specified length.
 */

const leftPadWithZeros = (value, length, prefix) => {
  const valueLength = value.toString().length;
  let zeroPrefix = "";

  for (let i = valueLength; i < length; i++) {
    zeroPrefix = zeroPrefix + "0";
  }

  return `${prefix ? prefix : ""}${zeroPrefix}${value}`;
};

export default leftPadWithZeros;
