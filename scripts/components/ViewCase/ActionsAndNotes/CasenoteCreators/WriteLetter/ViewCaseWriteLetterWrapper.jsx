import React from "react";
import WriteLetter from "../../../../common/CreateCommunication/WriteLetter";
import { useReduxSlice } from "./WriteLetter.redux";
import { useSaveLetter } from "./hooks/useSaveLetter";
import { useSendViaEmail } from "../../Casenotes/Letter/hooks/useSendViaEmail";

/**
 *  Wrapper component that handles case note interactions with the contact select when writing a letter.
 */
const ViewCaseWriteLetterWrapper = () => {
  const {
    setSelectedNote,
    caseId,
    constituent,
    removeSelectedNote,
    customFieldValues,
    caseDetails,
  } = useReduxSlice();

  const [handleSaveLetter] = useSaveLetter();
  const [handleSendViaEmail] = useSendViaEmail({
    caseID: caseId,
    type: "letter",
    note: "",
  });

  return (
    <WriteLetter
      caseId={caseId}
      constituent={constituent}
      letterSaved={(letter) => {
        setSelectedNote(letter.noteID);
        handleSaveLetter(letter);
      }}
      editorUnmounted={() => {
        removeSelectedNote();
      }}
      sendViaEmail={(letter) => {
        handleSaveLetter({
          id: letter.id,
          created: letter.created,
          reference: letter.reference,
          caseID: caseId,
          noteID: letter.noteID,
          openUpdateStatusModal: false,
        });
        handleSendViaEmail(letter.id);
      }}
      customFieldValues={customFieldValues}
      caseDetails={caseDetails}
    />
  );
};

export default ViewCaseWriteLetterWrapper;
