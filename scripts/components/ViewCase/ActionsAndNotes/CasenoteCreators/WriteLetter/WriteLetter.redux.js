import {
  dispatchAddCasenote,
  dispatchRemoveSelectedNote,
  dispatchSetSelectedNote,
  dispatchUpdateCasenoteByNoteId,
  selectCaseDetails,
  selectCaseId,
  selectConstituent,
  selectCustomFields,
} from "../../../slice/viewCaseSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  const constituent = useSelector(selectConstituent);
  const caseId = useSelector(selectCaseId);
  const addCasenote = (casenote) => dispatch(dispatchAddCasenote(casenote));
  const updateCasenoteByNoteId = (noteId, casenote) =>
    dispatch(dispatchUpdateCasenoteByNoteId({ noteId, casenote }));
  const setSelectedNote = (noteId) => dispatch(dispatchSetSelectedNote(noteId));
  const removeSelectedNote = () => dispatch(dispatchRemoveSelectedNote());
  const customFieldValues = useSelector(selectCustomFields);
  const caseDetails = useSelector(selectCaseDetails);

  return {
    constituent,
    caseId,
    addCasenote,
    updateCasenoteByNoteId,
    setSelectedNote,
    removeSelectedNote,
    customFieldValues,
    caseDetails,
  };
};
