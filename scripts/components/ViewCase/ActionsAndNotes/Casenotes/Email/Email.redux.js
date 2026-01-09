import {
  dispatchAddCasenote,
  dispatchRemoveCasenote,
  dispatchRemoveSelectedNote,
  dispatchSetSelectedNote,
  dispatchUpdateCasenote,
  dispatchUpdateCasenoteByNoteId,
  dispatchUpdateCasenoteThread,
  selectCaseDetails,
  selectCaseId,
  selectCaseworkers,
  selectCustomFields,
  selectSelectedCaseNote,
} from "../../../slice/viewCaseSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  return {
    caseId: useSelector(selectCaseId),
    updateCaseNoteThread: (index, casenote) =>
      dispatch(dispatchUpdateCasenoteThread({ index, casenote })),
    updateCasenote: (index, casenote) =>
      dispatch(dispatchUpdateCasenote({ index, casenote })),
    removeCasenote: (index) => dispatch(dispatchRemoveCasenote(index)),
    addCasenote: (casenote) => dispatch(dispatchAddCasenote(casenote)),
    selectedCaseNote: useSelector(selectSelectedCaseNote),
    removeSelectedNote: () => dispatch(dispatchRemoveSelectedNote()),
    setSelectedNote: (noteId) => dispatch(dispatchSetSelectedNote(noteId)),
    updateCasenoteById: (noteId, casenote) =>
      dispatch(dispatchUpdateCasenoteByNoteId({ noteId, casenote })),
    caseworkers: useSelector(selectCaseworkers),
    customFieldValues: useSelector(selectCustomFields),
    caseDetails: useSelector(selectCaseDetails),
  };
};
