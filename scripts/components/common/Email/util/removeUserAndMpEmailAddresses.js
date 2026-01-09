import {
  installationPreferences,
  userIdentity,
} from "../../../../helpers/localStorageHelper";

export const removeUserAndMpAddresses = (addresses) => {
  const loggedInUserEmailAddress = userIdentity.email;
  const mpEmailAddress = installationPreferences.defaultEmailAddress;
  return addresses.filter(
    (address) =>
      address.email !== loggedInUserEmailAddress &&
      address.email !== mpEmailAddress
  );
};
