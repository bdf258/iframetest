import { formatDateTimeBE } from "@electedtech/helpers/timezoneHelpers";
import { useRef } from "react";
import { userIdentity } from "../../../../../../helpers/localStorageHelper";
import { useReduxSlice } from "../WriteLetter.redux";
const { id: caseworkerID } = userIdentity;

export const useSaveLetter = () => {
  const { addCasenote, updateCasenoteByNoteId } = useReduxSlice();
  const letterSavedPreviously = useRef();

  const handleSaveLetter = (letter) => {
    const { id, created, reference, caseID, noteID, openUpdateStatusModal } =
      letter;

    const casenote = {
      openUpdateStatusModal,
      id: noteID,
      caseworkerID: caseworkerID,
      caseID: caseID,
      type: "letter",
      timestamp: created,
      detail: {
        updated: formatDateTimeBE(new Date()),
        id,
        reference,
        created,
      },
    };

    if (letterSavedPreviously.current) {
      updateCasenoteByNoteId(noteID, casenote);
    } else {
      addCasenote(casenote);
    }

    letterSavedPreviously.current = true;
  };
  return [handleSaveLetter];
};
