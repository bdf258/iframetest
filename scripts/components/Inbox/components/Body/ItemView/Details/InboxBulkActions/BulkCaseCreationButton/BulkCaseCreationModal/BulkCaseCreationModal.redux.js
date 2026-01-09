import {
  dispatchRemoveItems,
  selectItemsWithoutCase,
} from "../../../../../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  const removeItems = (itemsToRemove) => {
    dispatch(dispatchRemoveItems(itemsToRemove));
  };
  const itemsWithoutCases = useSelector(selectItemsWithoutCase);

  return { removeItems, itemsWithoutCases };
};
