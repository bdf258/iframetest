import { installationPreferences } from "../../../../helpers/localStorageHelper";
import leftPadWithZeros from "../../../../helpers/leftPadWithZeros";

export const getCaseRef = (caseId) => {
  const caseRef = installationPreferences.casePrefix;
  return leftPadWithZeros(caseId, 5, caseRef);
};
