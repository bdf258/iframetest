import {
  dispatchRemoveItems,
  selectCaseworkers,
  selectFocusedItem,
} from "../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  const removeItem = (item) => dispatch(dispatchRemoveItems(item));
  const caseworkers = useSelector(selectCaseworkers);
  const focusedItem = useSelector(selectFocusedItem);

  return { caseworkers, focusedItem, removeItem };
};
