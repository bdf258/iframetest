import { customFieldsAsMergeCodeMap } from "../../MergeCodes/util/customFieldsAsMergeCodeMap";
import { emailAddressFromFormInput } from "./emailAddressFromFormInput";
import { parseTemplate } from "../../MergeCodes/util/mergeCodes";

export const emailPayloadFromForm = ({
  form,
  emailId,
  caseId,
  constituentDetails,
  caseRef,
  iln,
  additionalMergeCodes,
}) => {
  return {
    caseID: caseId,
    ...(emailId && { emailID: emailId }),
    ...(form.to && { to: emailAddressFromFormInput(form.to) }),
    ...(form.cc && { cc: emailAddressFromFormInput(form.cc) }),
    ...(form.bcc && { bcc: emailAddressFromFormInput(form.bcc) }),
    ...(form.body && {
      htmlBody: parseTemplate({
        template: form.body,
        constituentDetails: constituentDetails,
        additionalMergeCodes: customFieldsAsMergeCodeMap(additionalMergeCodes),
        recipientDetails: null,
        caseRef,
        type: "email",
        iln,
      }),
    }),
    ...(form.from && { from: { email: form.from, name: "" } }),
    ...(form.subject && { subject: form.subject }),
  };
};
