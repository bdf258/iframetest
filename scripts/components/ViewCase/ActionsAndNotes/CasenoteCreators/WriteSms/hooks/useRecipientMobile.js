import {
  constituentTypeID,
  organisationTypeID,
} from "../../../../../common/CreateCommunication/consts/contactTypeIDs";
import { useEffect, useState } from "react";

import { constituentMobile } from "../util/constituentMobile";
import { useReduxSlice } from "../WriteSms.redux";

export const useRecipientMobile = (contact) => {
  const { constituent } = useReduxSlice();

  const [recipientMobile, setRecipientMobile] = useState();

  useEffect(() => {
    if (
      contact &&
      (contact.id === constituentTypeID || contact.id === organisationTypeID)
    ) {
      const mobile = constituentMobile(constituent);
      setRecipientMobile(mobile);
    } else {
      setRecipientMobile(undefined);
    }
  }, [contact]);
  return recipientMobile;
};
