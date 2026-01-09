const filterContactsWithoutEmail = (contacts) => {
  return contacts.filter(({ value }) => {
    const { email } = value;
    if (!email) return false;
    if (email.length === 0) return false;
    // will always only contain the maximum of one email address
    // emails are split into multiple contacts by explodeAllEmailAddresses.js
    if (!email[0]) return false;
    if (!email[0].value.trim()) return false;
    return true;
  });
};

export default filterContactsWithoutEmail;
