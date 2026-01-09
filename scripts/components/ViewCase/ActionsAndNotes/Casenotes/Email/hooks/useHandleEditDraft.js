import {
  dispatchRemoveSelectedNote,
  dispatchSetSelectedNote,
  dispatchUpdateCasenote,
  selectCaseDetails,
  selectCaseId,
  selectConstituent,
  selectCustomFields,
} from "../../../../slice/viewCaseSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { BE_DATE_FORMAT } from "../../../../../../consts/Date";
import { SliderContext } from "@electedtech/electedtech-ui";
import format from "date-fns/format";
import { useContext } from "react";
import useEditEmailInSlider from "../../../../../common/Email/hooks/Edit/useEditEmailInSlider.js";
import useGetCustomFieldMergeCodeList from "../../../../../../hooks/useGetCustomFieldMergeCodeList.js";

export const useHandleEditDraft = (id, casenote, index) => {
  const { sliderActions } = useContext(SliderContext);

  const dispatch = useDispatch();

  const caseId = useSelector(selectCaseId);
  const updateCasenote = (index, casenote) =>
    dispatch(dispatchUpdateCasenote({ index, casenote }));
  const setSelectedNote = (noteId) => dispatch(dispatchSetSelectedNote(noteId));
  const removeSelectedNote = () => dispatch(dispatchRemoveSelectedNote());
  const caseDetails = useSelector(selectCaseDetails);
  const customFieldValues = useSelector(selectCustomFields);
  const constituent = useSelector(selectConstituent);

  const [customFieldsAsMergeCodes] = useGetCustomFieldMergeCodeList({
    customFieldValues,
    caseCategory: caseDetails?.status,
    caseStatus: caseDetails?.category,
  });

  const handleEmailSaved = (savedEmail) => {
    updateCasenote(index, {
      ...casenote,
      timestamp: format(
        new Date(),
        `${BE_DATE_FORMAT.DATE} ${BE_DATE_FORMAT.TIME}`
      ),
      detail: savedEmail,
    });
  };
  const handleEmailSent = (sentEmail) => {
    updateCasenote(index, {
      ...casenote,
      detail: { ...sentEmail, type: "sent" },
    });
    sliderActions.close();
  };
  const handleEmailEditorUnmounted = () => {};

  const [editEmail] = useEditEmailInSlider({
    caseId,
    emailId: id,
    email: casenote.detail,
    constituent,
    handleEmailSaved,
    handleEmailSent,
    handleEmailEditorUnmounted,
    onSliderClose: removeSelectedNote,
    additionalMergeCodes: customFieldsAsMergeCodes,
  });

  return [
    () => {
      setSelectedNote(casenote.id);
      editEmail();
    },
  ];
};
