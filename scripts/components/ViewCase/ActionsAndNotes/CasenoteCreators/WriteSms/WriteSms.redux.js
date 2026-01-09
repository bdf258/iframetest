import {
  dispatchAddCasenote,
  dispatchRemoveSelectedNote,
  dispatchSetSelectedNote,
  dispatchUpdateCasenoteByNoteId,
  selectCaseId,
  selectConstituent,
} from "../../../slice/viewCaseSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  return {
    constituent: useSelector(selectConstituent),
    caseId: useSelector(selectCaseId),
    addCasenote: (casenote) => dispatch(dispatchAddCasenote(casenote)),
    updateCasenoteByNoteId: (noteId, casenote) =>
      dispatch(dispatchUpdateCasenoteByNoteId({ noteId, casenote })),
    setSelectedNote: (noteId) => dispatch(dispatchSetSelectedNote(noteId)),
    removeSelectedNote: () => dispatch(dispatchRemoveSelectedNote()),
  };
};
