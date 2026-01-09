import localStorageHelper from "../../../../helpers/localStorageHelper";

const locale = localStorageHelper.getItem("locale");

const enGBCallingCode = "+44";
const enAUCallingCode = "+61";
const enKYCallingCode = "+1";
const enCACallingCode = "+1";

export const removeCallingCode = (mobileNumber) => {
  if (!mobileNumber) return null;
  const hasCallingCode = mobileNumber.startsWith("+");

  switch (locale) {
    case "en_GB":
    case "cy_GB":
    case "en_AU": {
      if (!hasCallingCode && mobileNumber.startsWith("0")) return mobileNumber;
      if (!hasCallingCode && !mobileNumber.startsWith("0"))
        return `0${mobileNumber}`;
      if (hasCallingCode) return `0${mobileNumber.slice(3)}`;
      break;
    }
    case "en_CA": {
      if (!hasCallingCode && mobileNumber.startsWith("0")) return mobileNumber;
      if (!hasCallingCode && !mobileNumber.startsWith("0"))
        return `0${mobileNumber}`;
      if (hasCallingCode) return `0${mobileNumber.slice(2)}`;
      break;
    }
    // Cayman mobile numbers do not have a leading "0"
    case "en_KY": {
      if (!hasCallingCode) return mobileNumber;
      if (hasCallingCode) return `${mobileNumber.slice(2)}`;
      break;
    }
    default: {
      return mobileNumber;
    }
  }
};

export const addCallingCode = (mobileNumber) => {
  if (!mobileNumber) return null;
  const hasCallingCode = mobileNumber.startsWith("+");
  if (hasCallingCode) return mobileNumber;

  switch (locale) {
    case "en_GB":
    case "cy_GB": {
      return `${enGBCallingCode}${mobileNumber.slice(1)}`;
    }
    case "en_AU": {
      return `${enAUCallingCode}${mobileNumber.slice(1)}`;
    }
    // Cayman mobile numbers do not have a leading "0"
    case "en_KY": {
      return `${enKYCallingCode}${mobileNumber}`;
    }
    case "en_CA": {
      return `${enCACallingCode}${mobileNumber.slice(1)}`;
    }
  }
};

export const removeInvalidCharactersForMobileNumber = (mobileNumber) => {
  if (!mobileNumber) return null;
  return mobileNumber.replace(/^[^0-9+]|[^0-9]/g, "");
};

export const addSpaceFormattingToMobileNumber = (mobileNumber) => {
  if (!mobileNumber) return null;
  if (!mobileNumber.length >= 10) return mobileNumber;
  return `${mobileNumber.substring(0, 4)} ${mobileNumber.substring(
    4,
    7
  )} ${mobileNumber.substring(7)}`;
};

export const formatMobileNumberForDisplay = (mobileNumber) => {
  if (!mobileNumber) return null;

  const withoutCallingCode = removeCallingCode(mobileNumber);
  const withoutInvalidChars =
    removeInvalidCharactersForMobileNumber(withoutCallingCode);
  const formattedNumber = addSpaceFormattingToMobileNumber(withoutInvalidChars);

  return formattedNumber;
};
