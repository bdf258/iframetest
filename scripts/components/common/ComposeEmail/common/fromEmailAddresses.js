import {
  installationPreferences,
  userPreferences,
} from "../../../../helpers/localStorageHelper";

const getFromAddressesFromLocalStorage = () => {
  return userPreferences.altSendIsPrimary
    ? userPreferences.altSendEmailAs.concat([
        installationPreferences.defaultEmailAddress,
      ])
    : [installationPreferences.defaultEmailAddress].concat(
        userPreferences.altSendEmailAs
      );
};

const hasPermission = (value) =>
  getFromAddressesFromLocalStorage().includes(value);

export { getFromAddressesFromLocalStorage, hasPermission };
