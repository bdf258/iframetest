import { getEmailSubjectCaseRef } from "./getEmailSubjectCaseRef";

export const formHasAtLeastOneValue = (form, caseId) => {
  if (form) {
    return (
      form.to.chips.length !== 0 ||
      form.cc.chips.length !== 0 ||
      form.bcc.chips.length !== 0 ||
      validSubject(form.subject, caseId) ||
      form.attachments.length > 0
    );
  }
};

const validSubject = (subject, caseId) =>
  subject !== "" && caseId ? subject !== getEmailSubjectCaseRef(caseId) : false;
