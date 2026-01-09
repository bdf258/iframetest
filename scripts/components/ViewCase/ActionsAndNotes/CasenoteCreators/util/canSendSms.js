import { installationPreferences } from "../../../../../helpers/localStorageHelper";

export const canSendSms = () => {
  return !!installationPreferences?.SMSNumbers;
};
