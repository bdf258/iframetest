import { DATE_FORMAT } from "../../../../consts/Date";
import { format } from "date-fns";
import removeEmbeddedImages from "./removeEmbededImages";
import { signatureBlock } from "../../../ViewCase/ActionsAndNotes/Casenotes/Email/util/signatureBlock";
import { toLocalDate } from "../../../../helpers/timezoneHelpers";

export const replySeparator = `${signatureBlock}<br />________________________________<br />`;

const getEmailAddressesAsList = (emailAddresses) =>
  emailAddresses.flatMap((toEmail) => [toEmail.email]).join(", ");
export const getThreadedEmailDetails = (email) => {
  const ToAddressesAsList = getEmailAddressesAsList(email.to);
  const CcAddressesAsList = getEmailAddressesAsList(email.cc);

  return `
      From: ${email.from.name || ""} &lt; ${email.from.email} &gt;<br />
      Sent: ${format(
        toLocalDate(email.dateTime),
        DATE_FORMAT.DATE_ZERO + " " + DATE_FORMAT.TIME
      )}<br />
      To: ${ToAddressesAsList}<br />
      ${email.cc.length > 0 ? "Cc: " : ""}
      ${CcAddressesAsList}${email.cc.length ? "<br>" : ""}
      Subject: ${email.subject}<br /><br />
  `;
};

export const addReplySeparator = (email, body = "") => {
  if (!body) return "";

  const threadedEmailDetails = getThreadedEmailDetails(email);
  const bodyWithoutEmbeddedImages = removeEmbeddedImages(body);

  return `${replySeparator}${
    threadedEmailDetails ? threadedEmailDetails : ""
  }${bodyWithoutEmbeddedImages}`;
};
