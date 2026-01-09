import {
  dispatchAutoUpdateCasenoteByNoteId,
  dispatchRemoveCasenote,
  dispatchRemoveSelectedNote,
  dispatchSetSelectedNote,
  dispatchUpdateCasenote,
  dispatchUpdateCasenoteByNoteId,
  selectCasenotes,
  selectCasenotesFetching,
  selectCaseworkers,
  selectConstituent,
  selectSelectedCaseNote,
  selectTemporaryNotes,
} from "../../slice/viewCaseSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  const caseworkers = useSelector(selectCaseworkers);
  const casenotes = useSelector(selectCasenotes);
  const updateCasenote = ({ index, casenote }) =>
    dispatch(dispatchUpdateCasenote({ index, casenote }));
  const removeCasenote = (index) => dispatch(dispatchRemoveCasenote(index));
  const updateCasenoteByNoteId = ({ noteId, casenote }) =>
    dispatch(dispatchUpdateCasenoteByNoteId({ noteId, casenote }));
  const autoUpdateCasenoteByNoteId = ({ noteId, casenote }) =>
    dispatch(dispatchAutoUpdateCasenoteByNoteId({ noteId, casenote }));
  const casenotesFetching = useSelector(selectCasenotesFetching);
  const constituent = useSelector(selectConstituent);

  const selectedNote = useSelector(selectSelectedCaseNote);
  const setSelectedNote = (noteId) => dispatch(dispatchSetSelectedNote(noteId));
  const removeSelectedNote = () => dispatch(dispatchRemoveSelectedNote());
  const temporaryNotes = useSelector(selectTemporaryNotes);

  return {
    caseworkers,
    casenotes,
    updateCasenote,
    removeCasenote,
    updateCasenoteByNoteId,
    autoUpdateCasenoteByNoteId,
    casenotesFetching,
    constituent,
    selectedNote,
    setSelectedNote,
    removeSelectedNote,
    temporaryNotes,
  };
};
