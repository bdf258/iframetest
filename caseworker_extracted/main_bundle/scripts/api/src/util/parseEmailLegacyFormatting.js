/**
 * Removes emails that do not adhere to the standard shape expected on the front-end
 * Legacy emails: to, cc, bcc and from fields are returned as an Array<String>
 * The front-end expects <Array<Object{name<String>, email<String>}>> for To, Cc and Bcc fields.
 * The front-end expects <Object{name<String>, email<String>}> for From fields.
 *
 * Addition: Emails that are received from the door knocking or canvassing systems are returning the from field as a string.
 * Those emails are reformatted adhering to the above format.
 */
const emailHasCorrectShape = (email) => {
  if (!email) return false;

  return !!(
    typeof email === "object" ||
    email.hasOwnProperty("name") ||
    email.hasOwnProperty("email")
  );
};
const removeEmailsWithLegacyFormatting = (emails) => {
  if (!Array.isArray(emails)) return [];
  if (emails.length === 0) return emails;
  return emails.filter((email) => {
    return emailHasCorrectShape(email);
  });
};
const removeFromAddressWithLegacyFormatting = (fromAddress) => {
  if (Array.isArray(fromAddress)) return {};
  return emailHasCorrectShape(fromAddress) ? fromAddress : {};
};

const parseFrom = (fromAddress) => {
  if (typeof fromAddress === "string") return { email: fromAddress, name: "" };
  return removeFromAddressWithLegacyFormatting(fromAddress);
};

/**
 * Removes emails that do not adhere to the standard shape expected on the front-end.
 * If an email contains a from that is a string, reformats from into standard format.
 * @param {Promise} emailGetPromise - The promise that is returned from the backend [GET] /emails/${emailId}.
 * @returns {Promise} Email is wrapped in a Promise as though it was returned from the backend.
 */
export const parseEmailsForLegacyEmailFormatting = (emailGetPromise) => {
  return emailGetPromise.then((email) => {
    const { to, cc, bcc, from } = email;
    const addresses = [to, cc, bcc];
    const parsedEmailAddress = addresses.map((emails) =>
      removeEmailsWithLegacyFormatting(emails)
    );
    const parsedFrom = parseFrom(from);

    return Promise.resolve({
      ...email,
      to: parsedEmailAddress[0],
      cc: parsedEmailAddress[1],
      bcc: parsedEmailAddress[2],
      from: parsedFrom,
    });
  });
};
