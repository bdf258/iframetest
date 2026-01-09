import { isEmail } from "../../../../../../helpers/isEmailRegex";

const checkEmailAddresses = (emails) =>
  (Array.isArray(emails) ? emails : [emails]).map((item) => {
    const email = item?.email || "";
    const name = item?.name || "";

    return email?.trim().length > 0 && !isEmail(email)
      ? { name: email, email }
      : { name, email };
  });

const swapNameForEmailIfEmailInvalid = (casenote) => {
  return {
    ...casenote,
    detail: {
      ...casenote.detail,
      to: checkEmailAddresses(casenote.detail.to),
      cc: checkEmailAddresses(casenote.detail.cc),
      bcc: checkEmailAddresses(casenote.detail.bcc),
    },
  };
};

export default swapNameForEmailIfEmailInvalid;
