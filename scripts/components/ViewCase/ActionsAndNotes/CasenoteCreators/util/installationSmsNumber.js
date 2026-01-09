import { installationPreferences } from "../../../../../helpers/localStorageHelper";

export const installationSmsNumber = () => {
  return installationPreferences?.SMSNumbers;
};
