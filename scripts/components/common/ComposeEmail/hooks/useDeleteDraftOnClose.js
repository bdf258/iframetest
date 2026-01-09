import { useEffect, useRef } from "react";
import api from "@electedtech/api";

export const useDeleteDraftOnClose = (composeEmailState, canSaveDraft) => {
  const {
    emailId,
    modalActions,
    forwardedEmail,
    lastSavedEmail,
    form,
    bodyDirty,
    caseId,
  } = composeEmailState;

  const deleteDraftOnClose = useRef();

  const setDeleteDraftOnClose = (canDelete) => {
    deleteDraftOnClose.current = canDelete;
  };

  useEffect(() => {
    return () => {
      const deleteDraftClose = deleteDraftOnClose.current;
      if (deleteDraftClose) {
        (async () => {
          await api.deleteEmail(emailId, modalActions);
        })();
      }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    deleteDraftOnClose.current =
      forwardedEmail && !canSaveDraft(lastSavedEmail, form, bodyDirty, caseId);
  }, [lastSavedEmail, form, bodyDirty, caseId]);

  return [setDeleteDraftOnClose];
};
