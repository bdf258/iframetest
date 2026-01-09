import {
  dispatchUpdateItem,
  selectCaseworkers,
  selectFocusedItem,
} from "../../../../../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  const focusedItem = useSelector(selectFocusedItem);
  const caseworkers = useSelector(selectCaseworkers);
  return {
    updateItem: (updatedItem) => dispatch(dispatchUpdateItem(updatedItem)),
    focusedItem,
    caseworkers,
  };
};
