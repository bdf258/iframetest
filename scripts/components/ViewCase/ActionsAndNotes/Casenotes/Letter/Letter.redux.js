import {
  dispatchAddCasenote,
  dispatchAddTemporaryNote,
  dispatchRemoveCasenote,
  dispatchRemoveSelectedNote,
  dispatchRemoveTemporaryNote,
  dispatchSetSelectedNote,
  dispatchSetShowUpdateCaseStatusModal,
  dispatchUpdateCasenote,
  dispatchUpdateCasenoteByNoteId,
  selectCaseDetails,
  selectCaseId,
  selectCasenotes,
  selectCaseworkers,
  selectConstituent,
  selectContactTypes,
  selectCustomFields,
  selectSelectedCaseNote,
} from "../../../slice/viewCaseSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  return {
    casenotes: useSelector(selectCasenotes),
    constituent: useSelector(selectConstituent),
    caseId: useSelector(selectCaseId),
    addCasenote: (casenote) => dispatch(dispatchAddCasenote(casenote)),
    updateCasenote: (index, casenote) =>
      dispatch(dispatchUpdateCasenote({ index, casenote })),
    updateCasenoteByNoteId: (noteId, casenote) =>
      dispatch(dispatchUpdateCasenoteByNoteId({ noteId, casenote })),
    removeCasenote: (index) => dispatch(dispatchRemoveCasenote(index)),
    setShowCaseStatusModal: (payload) =>
      dispatch(dispatchSetShowUpdateCaseStatusModal(payload)),
    selectedNote: useSelector(selectSelectedCaseNote),
    setSelectedNote: (noteId) => dispatch(dispatchSetSelectedNote(noteId)),
    removeSelectedNote: () => dispatch(dispatchRemoveSelectedNote()),
    addTemporaryNote: (noteId) => dispatch(dispatchAddTemporaryNote(noteId)),
    removeTemporaryNote: (noteId) =>
      dispatch(dispatchRemoveTemporaryNote(noteId)),
    contactTypes: useSelector(selectContactTypes),
    caseworkers: useSelector(selectCaseworkers),
    customFieldValues: useSelector(selectCustomFields),
    caseDetails: useSelector(selectCaseDetails),
  };
};
