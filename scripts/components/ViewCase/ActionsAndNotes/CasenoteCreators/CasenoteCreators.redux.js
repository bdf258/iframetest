import {
  dispatchAddCasenote,
  dispatchAutoUpdateCasenoteByNoteId,
  dispatchRemoveSelectedNote,
  dispatchSetSelectedNote,
  dispatchUpdateCasenoteByNoteId,
  selectCaseId,
  selectConstituent,
  selectSelectedCaseNote,
} from "../../slice/viewCaseSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  return {
    caseID: useSelector(selectCaseId),
    addCasenote: (casenote) => dispatch(dispatchAddCasenote(casenote)),
    constituent: useSelector(selectConstituent),
    setSelectedCaseNote: (noteId) => dispatch(dispatchSetSelectedNote(noteId)),
    removeSelectedNote: () => dispatch(dispatchRemoveSelectedNote()),
    selectedNote: useSelector(selectSelectedCaseNote),
    setSelectedNote: (noteId) => dispatch(dispatchSetSelectedNote(noteId)),
    updateCasenoteByNoteId: ({ noteId, casenote }) =>
      dispatch(dispatchUpdateCasenoteByNoteId({ noteId, casenote })),
    autoUpdateCasenoteByNoteId: ({ noteId, casenote }) =>
      dispatch(dispatchAutoUpdateCasenoteByNoteId({ noteId, casenote })),
  };
};
