import {
  dispatchResetSelected,
  dispatchSelectAll,
  selectItems,
  selectSelected,
} from "../../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  const selectAll = () => dispatch(dispatchSelectAll());
  const deselectAll = () => dispatch(dispatchResetSelected());

  const items = useSelector(selectItems);
  const selectedItems = useSelector(selectSelected);

  return { items, selectedItems, selectAll, deselectAll };
};
