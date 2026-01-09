import {
  dispatchAddCasenote,
  dispatchUpdateCasenoteByNoteId,
} from "../../../slice/viewCaseSlice";
import { useDispatch } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  return {
    addCasenote: (casenote) => dispatch(dispatchAddCasenote(casenote)),
    updateCasenoteByNoteId: (noteId, casenote) =>
      dispatch(dispatchUpdateCasenoteByNoteId({ noteId, casenote })),
  };
};
