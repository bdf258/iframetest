import { duplicateEmailAddressesAcrossToCcBcc } from "./duplicateEmailAddressesAcrossToCcBcc";

export const canInitiateSend = (form) => {
  return (
    (form?.to?.chips?.length > 0 ||
      form?.cc?.chips.length ||
      form?.bcc?.chips.length > 0) &&
    !!form.from &&
    !validEmailAddresses(form?.to?.chips, form?.cc?.chips, form?.bcc?.chips) &&
    duplicateEmailAddressesAcrossToCcBcc(
      form.to.chips,
      form.cc.chips,
      form.bcc.chips,
      "label"
    ).length <= 0
    && form.subject.trim().length > 0
  );
};

const validEmailAddresses = (to, cc, bcc) =>
  [...(to && to), ...(cc && cc), ...(bcc && bcc)].some(
    (email) => email.valid === false
  );
