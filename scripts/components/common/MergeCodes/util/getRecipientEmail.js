/**
 * When formatting a recipients details, the email received by useRecipient from the letter editor is in an inconsistent format.
 * When the recipient is the constituent the shape of the email addresses is an Array of objects: [{value, primary}]
 * When the recipient is a third party the email is simply a string.
 * This util function seeks to standardise the data structure.
 *
 * @param {(string | Array<{ primary: boolean, email: string }>)} email - The recipients email address
 * @returns {string}
 */
export const getRecipientEmail = (email) => {
  if (!email) return "";
  if (typeof email === "string") return email;
  if (Array.isArray(email)) {
    if (email.length === 0) return "";
    let primaryEmail = email.find((emailObj) => emailObj?.primary === true);
    const emailAddress = primaryEmail ? primaryEmail?.value : email[0]?.value;
    if (emailAddress) return emailAddress;
    return "";
  }
  return "";
};
