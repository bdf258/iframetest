import {
  dispatchSetFocusedID,
  selectFocusedItem,
  selectItems,
  selectItemsLength,
  selectItemsLoading,
} from "../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  const setFocusedID = (item) => dispatch(dispatchSetFocusedID(item));

  const itemsLoading = useSelector(selectItemsLoading);
  const focusedItem = useSelector(selectFocusedItem);
  const items = useSelector(selectItems);
  const totalNumberOfItems = useSelector(selectItemsLength);

  return {
    itemsLoading,
    setFocusedID,
    focusedItem,
    totalNumberOfItems,
    items,
  };
};
