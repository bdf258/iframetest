import { useReduxSlice as ActionsAndNotesRedux } from "../../../ActionsAndNotes.redux.js";
import createUid from "../../../../../../util/generateUid";
import { selectContactTypes } from "../../../../slice/viewCaseSlice.js";
import { useForwardEmailInSlider } from "../../../../../common/Email/hooks/Forward/useForwardEmailInSlider";
import useHandleEmailCaseNoteEvents from "./useHandleEmailCaseNoteEvents";
import { useSelector } from "react-redux";

export const useHandleEmailForward = (casenote) => {
  const {
    constituent,
    caseDetails: { customFields: customFieldValues, ...caseDetails },
  } = ActionsAndNotesRedux();
  const contactTypes = useSelector(selectContactTypes);
  const { handleEmailChange, handleCaseNoteEditorUnmounted } =
    useHandleEmailCaseNoteEvents();

  casenote = { ...casenote, id: createUid() };
  const email = casenote.detail;

  const handleEmailSaved = (savedEmail) => {
    handleEmailChange(
      {
        ...casenote,
        detail: savedEmail,
        id: savedEmail.noteID,
      },
      savedEmail.noteID
    );
  };

  const handleEmailSent = (sentEmail) => {
    handleEmailChange(
      {
        ...casenote,
        detail: sentEmail,
        id: sentEmail.noteID,
      },
      sentEmail.noteID
    );
  };

  const [handleForward] = useForwardEmailInSlider({
    caseId: email.caseID,
    emailToForward: email,
    constituent,
    handleEmailSaved,
    handleEmailSent,
    handleEmailEditorUnmounted: handleCaseNoteEditorUnmounted,
    contactTypes,
    customFieldValues,
    caseDetails,
  });

  return [handleForward];
};

export default useHandleEmailForward;
