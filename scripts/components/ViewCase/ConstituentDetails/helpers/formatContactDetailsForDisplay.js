import convertMobileNumber from "./convertMobileNumber";
import convertTelephoneNumber from "./convertTelephoneNumber";

const contactDetailsAsOneLine = (contactDetails) =>
  contactDetails.filter((contact) => !!contact).join(" | ");

export const formatTelephoneNumbersForDisplay = (telephoneNumbersDetails) => {
  if (!telephoneNumbersDetails) return "";
  const sortedTelephoneNumbers = sortContactsByPrimary(telephoneNumbersDetails);
  const individuallyFormattedTelephoneNumbers = sortedTelephoneNumbers.map(
    (telephoneNumber) => {
      return convertTelephoneNumber(telephoneNumber);
    }
  );
  const telephoneNumbersAsOneLine = contactDetailsAsOneLine(
    individuallyFormattedTelephoneNumbers
  );
  return telephoneNumbersAsOneLine;
};

export const formatMobileNumbersForDisplay = (mobileNumbersDetails) => {
  if (!mobileNumbersDetails) return "";
  const sortedMobileNumbers = sortContactsByPrimary(mobileNumbersDetails);
  const individuallyFormattedMobileNumbers = sortedMobileNumbers.map(
    (mobileNumber) => {
      return convertMobileNumber(mobileNumber);
    }
  );
  const mobileNumbersAsOneLine = contactDetailsAsOneLine(
    individuallyFormattedMobileNumbers
  );
  return mobileNumbersAsOneLine;
};

export const formatEmailAddressesForDisplay = (emailAddressesDetails) => {
  if (!emailAddressesDetails) return "";
  const sortedMobileNumbers = sortContactsByPrimary(emailAddressesDetails);
  const emailAddressesAsOneLine = contactDetailsAsOneLine(sortedMobileNumbers);
  return emailAddressesAsOneLine;
};

// primary contact comes first in list
const sortContactsByPrimary = (contactDetails) => {
  return contactDetails.reduce((acc, contact) => {
    if (!contact) return acc;

    const { value, primary: primaryContact } = contact;

    if (primaryContact) {
      return [value, ...acc];
    }
    return [...acc, value];
  }, []);
};
