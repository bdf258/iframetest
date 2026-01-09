import { useEffect, useState } from "react";

import { getAddressBlock } from "../../LetterEditor/hooks/common/addressBlock";
import { getAddressForLocale } from "../util/formatAddress";
import { getRecipientEmail } from "../util/getRecipientEmail";
import localStorageHelper from "@electedtech/helpers/localStorageHelper";

const formatRecipientsDetails = (recipient, locale) => {
  const email = getRecipientEmail(recipient?.email);

  const {
    title,
    firstName,
    surname,
    role,
    organisation,
    acronym,
    suffix,
    mobile,
    telephone,
    postNominal,
  } = recipient;

  const details = {
    role,
    organisation,
    acronym,
    suffix,
    postNominal,
    name: {
      firstName,
      surname,
      title,
    },
    email,
    mobile,
    telephone,
    address: getAddressForLocale(recipient, locale),
  };

  return {
    ...details,
    addressBlock: getAddressBlock(details, locale),
  };
};

export const useRecipientDetails = (recipient) => {
  const [recipientDetails, setRecipientDetails] = useState();
  const [locale] = useState(
    () => localStorageHelper.getItem("installationPreferences").locale
  );
  useEffect(() => {
    if (recipient) {
      setRecipientDetails(formatRecipientsDetails(recipient, locale));
    }
  }, [recipient]);
  return [recipientDetails];
};
