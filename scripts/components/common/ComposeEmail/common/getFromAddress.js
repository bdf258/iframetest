import {
  installationPreferences,
  userPreferences,
} from "../../../../helpers/localStorageHelper";

const hasPermission = (value, fromAddresses) => fromAddresses.includes(value);

export const fromAddressesFromLocalStorage = () => {
  const alternateSendAddressIsPrimary = userPreferences.altSendIsPrimary;
  const installationDefaultEmailAddress =
    installationPreferences.defaultEmailAddress;
  const userAlternateEmailAddresses = userPreferences.altSendEmailAs;

  if (
    !installationDefaultEmailAddress &&
    !userAlternateEmailAddresses &&
    !userAlternateEmailAddresses.length <= 0
  ) {
    return [];
  }

  if (!installationDefaultEmailAddress) {
    return [...userAlternateEmailAddresses];
  }

  if (alternateSendAddressIsPrimary) {
    return [...userAlternateEmailAddresses, installationDefaultEmailAddress];
  }

  if (!alternateSendAddressIsPrimary) {
    return [
      ...[installationDefaultEmailAddress],
      ...userAlternateEmailAddresses,
    ];
  }

  return [];
};

const getFromAddresses = (value, fromAddresses) => {
  /**
   * Removes from addresses that have not been setup as send from addresses on the installation.
   */
  if (value && hasPermission(value, fromAddresses)) {
    return [value, ...fromAddresses];
  }

  return fromAddresses;
};

/**
 * In older versions of Caseworker, leaving the default email address blank would cause the system to break.
 * To avoid this, "nodefault" was used as a placeholder when no default email address was specified.
 * This is now handled on the front-end in the newer areas on the application.
 * "nodefault" email addresses are filtered out.
 */
const removeNoDefaultEmailAddresses = (fromEmailAddressList) => {
  return fromEmailAddressList.filter(
    (address) => address.toLowerCase() !== "nodefault"
  );
};

/**.
 * Check if the supplied initialFromAddress has the correct permission to send from, otherwise returns the installations preferred from address.
 * @param initialFromAddress - From address that may be present on emails
 * @returns {*|string}
 */
export const getFromAddress = (initialFromAddress) => {
  const fromAddresses = getFromAddresses(
    initialFromAddress,
    removeNoDefaultEmailAddresses(fromAddressesFromLocalStorage())
  );

  return fromAddresses && fromAddresses.length > 0 ? fromAddresses[0] : "";
};
