import {
  dispatchRemoveItems,
  dispatchUpdateItem,
  selectCaseworkers,
  selectFilterCaseworkerID,
} from "../../../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  const caseworkers = useSelector(selectCaseworkers);
  const selectedInboxID = useSelector(selectFilterCaseworkerID);

  const updateItem = (payload) => dispatch(dispatchUpdateItem(payload));
  const removeItem = (itemID) => dispatch(dispatchRemoveItems(itemID));

  return {
    updateItem,
    caseworkers,
    removeItem,
    selectedInboxID,
  };
};
