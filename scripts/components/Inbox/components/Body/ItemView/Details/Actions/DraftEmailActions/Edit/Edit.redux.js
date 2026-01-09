import {
  dispatchRemoveItems,
  dispatchUpdateItem,
} from "../../../../../../../slice/inboxSlice";

import { useDispatch } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  return {
    updateDraftEmail: (updatedDraft) =>
      dispatch(dispatchUpdateItem(updatedDraft)),
    removeSentDraftEmail: (sentDraftEmail) =>
      dispatch(dispatchRemoveItems(sentDraftEmail)),
  };
};
