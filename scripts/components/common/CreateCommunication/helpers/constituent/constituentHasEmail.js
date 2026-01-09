export const constituentHasEmailAddress = (constituent = { email: [] }) => {
  const { email: emailAddresses } = constituent;
  if (emailAddresses?.length === 0) return false;
  const validEmailAddresses = emailAddresses.filter(({ value }) => !!value);
  return validEmailAddresses.length > 0;
};
