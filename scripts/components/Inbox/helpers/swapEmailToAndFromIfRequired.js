import {
  getCaseworkers as getCaseworkersFromLocalStorage,
  getInstallationPreferences,
  getMasterConfig,
} from "../../../helpers/localStorageHelper";

const { defaultEmailAddress } = getInstallationPreferences() || {};
const { MPEmailAddress } = getMasterConfig() || {};
const activeCaseworkers = (getCaseworkersFromLocalStorage() || []).filter(
  (caseworker) => caseworker.active
);

const processString = (string = "") => string.trim().toLowerCase();

export const isEmailFromCaseworker = ({ from: { email: fromAddress } }) => {
  if (!fromAddress) return;

  return activeCaseworkers.some(
    ({ email: caseworkerEmail }) =>
      processString(caseworkerEmail) === processString(fromAddress)
  );
};

export const isEmailFromConfigAddress = ({ from: { email: fromAddress } }) => {
  if (!fromAddress) return;

  const systemEmails = [defaultEmailAddress, MPEmailAddress];

  return systemEmails.some(
    (systemEmail) => processString(systemEmail) === processString(fromAddress)
  );
};

const swapEmailToAndFromIfRequired = (email) => {
  if (isEmailFromCaseworker(email) || isEmailFromConfigAddress(email)) {
    return { ...email, to: [email.from], from: email.to[0] };
  } else {
    return email;
  }
};

export default swapEmailToAndFromIfRequired;
