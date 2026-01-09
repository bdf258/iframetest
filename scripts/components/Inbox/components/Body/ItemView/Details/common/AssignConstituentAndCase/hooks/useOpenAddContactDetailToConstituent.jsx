import React, { useContext } from "react";

import AddContactDetailToConstituent from "../common/AddContactDetailToConstituent/AddContactDetailToConstituent.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../../../../../context/translation/TranslationContext";
import { allowInboxSuggestChangedEmail } from "../../../../../../../../../consts/disabledFeatures";

const modalID = "AddContactDetailToConstituentModalID";

const useOpenAddContactDetailToConstituent = (inboxItem) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const from = (inboxItem?.from?.email || "").trim().toLowerCase();

  const checkOpenAddContactDetailToConstituent = (constituent) => {
    if (!from) return;
    if (["external-new"].includes(inboxItem.type.toLowerCase())) {
      const constituentEmails = constituent?.email || [];
      const hasNoEmail = constituentEmails.length === 0;
      const isEmailOnFile = constituentEmails.some(
        ({ value }) => value.trim().toLowerCase() === from
      );

      if (hasNoEmail || (!isEmailOnFile && allowInboxSuggestChangedEmail)) {
        modalActions.add({
          id: modalID,
          title: iln.gettext("Update Constituent Contact Details?"),
          component: (
            <AddContactDetailToConstituent
              modalID={modalID}
              constituent={constituent}
              email={from}
            />
          ),
        });
      }
    } else if (
      ["sms-inbound", "whatsapp-inbound"].includes(inboxItem.type.toLowerCase())
    ) {
      const constituentMobiles = constituent?.mobile || [];
      const hasNoMobile = constituentMobiles.length === 0;
      const isMobileOnFile = constituentMobiles.some(
        ({ value }) => value.trim().toLowerCase() === from
      );

      if (hasNoMobile || !isMobileOnFile) {
        modalActions.add({
          id: modalID,
          title: iln.gettext("Update Constituent Contact Details?"),
          component: (
            <AddContactDetailToConstituent
              modalID={modalID}
              constituent={constituent}
              mobile={from}
            />
          ),
        });
      }
    }
  };

  return checkOpenAddContactDetailToConstituent;
};

export default useOpenAddContactDetailToConstituent;
