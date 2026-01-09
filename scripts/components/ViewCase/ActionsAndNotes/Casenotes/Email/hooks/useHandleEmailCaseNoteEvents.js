import { useReduxSlice } from "../Email.redux";
import { useRef } from "react";

const useHandleEmailCaseNoteEvents = () => {
  const emailSavedAtLeastOnce = useRef(false);

  const {
    addCasenote,
    setSelectedNote,
    updateCasenoteById,
    removeSelectedNote,
  } = useReduxSlice();
  const handleEmailChange = (casenote, noteId) => {
    if (emailSavedAtLeastOnce.current) {
      updateCasenoteById(noteId, casenote);
    } else {
      addCasenote(casenote);
    }
    setSelectedNote(noteId);
    emailSavedAtLeastOnce.current = true;
  };

  const handleCaseNoteEditorUnmounted = () => {
    removeSelectedNote();
    emailSavedAtLeastOnce.current = false;
  };

  return { handleEmailChange, handleCaseNoteEditorUnmounted };
};

export default useHandleEmailCaseNoteEvents;
