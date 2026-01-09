import {
  dispatchAddCasenote,
  dispatchRemoveCasenote,
  dispatchSetReviewDateDetails,
  dispatchSetSelectedNote,
  dispatchUpdateCasenote,
  dispatchUpdateCasenoteByNoteId,
  selectCaseId,
  selectConstituent,
  selectSelectedCaseNote,
} from "../../../slice/viewCaseSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  return {
    constituent: useSelector(selectConstituent),
    caseId: useSelector(selectCaseId),
    updateCasenote: (index, casenote) =>
      dispatch(dispatchUpdateCasenote({ index, casenote })),
    removeCasenote: (index) => dispatch(dispatchRemoveCasenote(index)),
    addCasenote: (casenote) => dispatch(dispatchAddCasenote(casenote)),
    setReviewDateDetails: (payload) =>
      dispatch(dispatchSetReviewDateDetails(payload)),
    selectedNote: useSelector(selectSelectedCaseNote),
    setSelectedNote: (noteId) => dispatch(dispatchSetSelectedNote(noteId)),
    updateCasenoteByID: (payload) =>
      dispatch(dispatchUpdateCasenoteByNoteId(payload)),
  };
};
