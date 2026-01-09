import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@electedtech/electedtech-ui";

const useSaveEmail = (emailId, saveDraft) => {
  const { modalActions } = useContext(ModalContext);

  const [savingEmail, setSavingEmail] = useState(!emailId);

  // if attachment manager is opened before the email is saved, save an email draft
  useEffect(() => {
    (async () => {
      if (!emailId) {
        const { id } = await saveDraft();
        modalActions.setProps({
          emailId: id,
        });
        setSavingEmail(false);
      }
    })();
  }, [setSavingEmail, modalActions, emailId]);

  return [savingEmail];
};

export default useSaveEmail;
