import {
  dispatchAddCasenote,
  dispatchUpdateCasenoteByNoteId,
} from "../../../../slice/viewCaseSlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";

const useReduxSlice = () => {
  const dispatch = useDispatch();
  return {
    addCasenote: (casenote) => dispatch(dispatchAddCasenote(casenote)),
    updateCasenoteByNoteId: (noteId, casenote) =>
      dispatch(dispatchUpdateCasenoteByNoteId({ noteId, casenote })),
  };
};

export const useHandleEmailNoteChange = () => {
  const { addCasenote, updateCasenoteByNoteId } = useReduxSlice();

  const previouslySaved = useRef();

  const handleEmailNoteChange = (email, type) => {
    const casenote = {
      id: email.noteID,
      caseworkerID: email.assignedTo,
      caseID: email.caseID,
      type: "email",
      detail: { ...email, type: type === "sent" ? "sent" : "draft" },
      timestamp: email.dateTime,
      note: "",
    };

    if (previouslySaved.current) {
      updateCasenoteByNoteId(casenote.id, casenote);
    } else {
      addCasenote(casenote);
    }
    previouslySaved.current = true;
  };
  return [handleEmailNoteChange];
};
