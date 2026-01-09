import { installationPreferences } from "../../../../helpers/localStorageHelper";
import leftPadWithZeros from "../../../../helpers/leftPadWithZeros";

export const getEmailSubjectCaseRef = (caseId) => {
  const caseRef = installationPreferences.casePrefix;
  return `(Case Ref: ${leftPadWithZeros(caseId, 5, caseRef)})`;
};
