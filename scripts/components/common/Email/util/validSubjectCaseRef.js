import { getEmailSubjectCaseRef } from "../../ComposeEmail/common/getEmailSubjectCaseRef";
import { installationPreferences } from "../../../../helpers/localStorageHelper";

export const getValidSubjectCaseRef = (subject, caseId) => {
  const caseRef = getEmailSubjectCaseRef(caseId);

  if (!subject) {
    return caseRef;
  }
  const hasCaseRef = new RegExp(/\(Case Ref: ([A-Z]+)\d+\)$/);
  const hasValidCaseRef = hasCaseRef[Symbol.match](subject);
  const installationCasePrefix = installationPreferences.casePrefix;

  if (hasValidCaseRef) {
    const regexPrefixGrouping = hasValidCaseRef[1];
    if (regexPrefixGrouping === installationCasePrefix) {
      return subject;
    } else {
      return hasCaseRef[Symbol.replace](subject, caseRef);
    }
  }
  return `${subject} ${caseRef}`;
};
