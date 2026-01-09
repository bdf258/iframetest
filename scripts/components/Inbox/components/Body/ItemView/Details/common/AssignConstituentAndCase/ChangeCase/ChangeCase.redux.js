import {
  dispatchUpdateItem,
  selectFocusedItem,
} from "../../../../../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  const focusedItem = useSelector(selectFocusedItem);
  return {
    focusedItem,
    updateItem: (update) => dispatch(dispatchUpdateItem(update)),
  };
};
