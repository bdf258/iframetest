import { useEffect, useRef } from "react";
import { canSaveDraft } from "../common/canSaveDraft";

export const useCanSaveDraftOnClose = (composeEmailState) => {
  const { lastSavedEmail, form, bodyDirty, caseId } = composeEmailState;
  const saveDraftOnClose = useRef();

  useEffect(() => {
    saveDraftOnClose.current = canSaveDraft(
      lastSavedEmail,
      form,
      bodyDirty,
      caseId
    );
  }, [lastSavedEmail, form, bodyDirty, caseId]);

  return [saveDraftOnClose];
};
