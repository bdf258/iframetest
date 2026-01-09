export const emailAddressFromFormInput = (emailAddresses) => {
  return emailAddresses.chips.map((email) => ({
    email: email.label,
    name: "",
  }));
};
