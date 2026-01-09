import {
  selectCaseDetails,
  selectConstituent,
  selectCustomFields,
} from "../../../../slice/viewCaseSlice.js";

import createUid from "../../../../../../util/generateUid";
import { localDateToUTCString } from "../../../../../../helpers/timezoneHelpers.js";
import useGetCustomFieldMergeCodeList from "../../../../../../hooks/useGetCustomFieldMergeCodeList.js";
import useHandleEmailCaseNoteEvents from "./useHandleEmailCaseNoteEvents";
import { useReplyAllEmailInSlider } from "../../../../../common/Email/hooks/ReplyAll/useReplyAllEmailInSlider";
import { useSelector } from "react-redux";

export const useHandleReplyAll = (casenote) => {
  const { handleEmailChange, handleCaseNoteEditorUnmounted } =
    useHandleEmailCaseNoteEvents();

  const constituent = useSelector(selectConstituent);
  const caseDetails = useSelector(selectCaseDetails);
  const customFieldValues = useSelector(selectCustomFields);

  const [customFieldsAsMergeCodes] = useGetCustomFieldMergeCodeList({
    customFieldValues,
    caseCategory: caseDetails?.status,
    caseStatus: caseDetails?.category,
  });

  casenote = {
    ...casenote,
    id: createUid(),
    timestamp: localDateToUTCString(new Date()),
  };
  const { id, caseID } = casenote.detail;

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
        detail: { ...sentEmail, type: "sent" },
        id: sentEmail.noteID,
      },
      sentEmail.noteID
    );
  };

  const [handleReplyAll] = useReplyAllEmailInSlider({
    caseId: caseID,
    emailId: id,
    constituent,
    handleEmailSaved,
    handleEmailSent,
    handleEmailEditorUnmounted: handleCaseNoteEditorUnmounted,
    additionalMergeCodes: customFieldsAsMergeCodes,
  });

  return [handleReplyAll];
};
