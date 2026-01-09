import { useContext, useState } from "react";

import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { useReduxSlice } from "../Email.redux";

export const useLoadThread = (casenote, index) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const { updateCaseNoteThread } = useReduxSlice();

  const [loadingThread, setLoadingThread] = useState(false);
  const [thread, setThread] = useState();

  const handleLoadThread = async () => {
    setLoadingThread(true);
    try {
      const email = await api.getEmail(casenote.detail.id, modalActions, iln);
      setLoadingThread(false);
      setThread(email);
      updateCaseNoteThread(index, {
        ...casenote,
        detail: email,
      });
    } catch (e) {
      setLoadingThread(false);
    }
  };
  return [handleLoadThread, thread, loadingThread];
};
