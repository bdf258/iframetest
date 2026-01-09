import {
  dispatchAddCasenote,
  dispatchUpdateCasenoteByNoteId,
  selectCasenotes,
  selectCasenotesHasMore,
} from "../../slice/viewCaseSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  const addCasenote = (payload) => dispatch(dispatchAddCasenote(payload));
  const updateCasenoteByID = (payload) =>
    dispatch(dispatchUpdateCasenoteByNoteId(payload));

  const casenotes = useSelector(selectCasenotes);
  const hasMore = useSelector(selectCasenotesHasMore);

  return {
    casenotes,
    hasMore,
    addCasenote,
    updateCasenoteByID,
  };
};
