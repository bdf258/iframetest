import React, { useContext } from "react";

import { SliderContext } from "@electedtech/electedtech-ui";
import WriteEmail from "../../../../common/CreateCommunication/WriteEmail";
import { useHandleEmailNoteChange } from "./hooks/useHandleEmailNoteChange.jsx";
import { useReduxSlice } from "./WriteEmail.redux";

// Wrapper component that handles case note interactions with the contact select when writing an email.
const ViewCaseWriteEmailWrapper = () => {
  const {
    setSelectedNote,
    removeSelectedNote,
    caseId,
    constituent,
    contactTypes = [],
    customFieldValues,
    caseDetails,
  } = useReduxSlice();

  const [handleEmailNoteChange] = useHandleEmailNoteChange();
  const { sliderActions } = useContext(SliderContext);

  return (
    <WriteEmail
      caseId={caseId}
      constituent={constituent}
      contactTypes={contactTypes}
      emailSent={(email) => {
        setSelectedNote(email.noteID);
        handleEmailNoteChange(email, "sent");
        sliderActions.close();
      }}
      emailSaved={(email) => {
        setSelectedNote(email.noteID);
        handleEmailNoteChange(email, "saved");
      }}
      editorUnmounted={removeSelectedNote}
      customFieldValues={customFieldValues}
      caseDetails={caseDetails}
    />
  );
};

export default ViewCaseWriteEmailWrapper;
