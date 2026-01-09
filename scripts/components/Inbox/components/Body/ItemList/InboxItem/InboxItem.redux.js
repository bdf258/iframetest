import {
  dispatchAddToSelected,
  dispatchBulkAddToSelected,
  dispatchRemoveFromSelected,
  dispatchSetFocusedID,
  selectFocusedItem,
  selectSelected,
} from "../../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  const selectedItems = useSelector(selectSelected);
  const focusedItem = useSelector(selectFocusedItem);
  const removeFromSelected = (item) =>
    dispatch(dispatchRemoveFromSelected(item));
  const addToSelected = (item) => dispatch(dispatchAddToSelected(item));
  const setFocusedID = (itemID) => dispatch(dispatchSetFocusedID(itemID));
  const bulkAddToSelected = ({ index, item }) =>
    dispatch(dispatchBulkAddToSelected({ index, item }));

  return {
    selectedItems,
    focusedItem,
    removeFromSelected,
    addToSelected,
    setFocusedID,
    bulkAddToSelected,
  };
};
