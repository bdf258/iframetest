import { format, isValid } from "date-fns";

import { toLocalDate } from "../../../../../../../../../../../helpers/timezoneHelpers";

const formatDate = (date) =>
  isValid(toLocalDate(date))
    ? format(toLocalDate(date), "d MMMM yyyy HH:mm")
    : null;

const useReplySeparator = (email) => {
  const { to, from, purifiedBody, dateTime, subject } = email;

  const emailBody = `
    <br><br>________________________________________<br>
     From: ${to[0].name} &lt;${to[0].email}&gt;<br>
     Sent: ${formatDate(dateTime)}<br>
     To: "${from.name ? from.name : from.email}" &lt;${from.email}&gt;<br>
     Subject: ${subject}<br><br>
     ${purifiedBody}
    `;

  return [emailBody];
};

export default useReplySeparator;
