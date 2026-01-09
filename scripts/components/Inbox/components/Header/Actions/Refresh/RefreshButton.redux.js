import {
  selectItemsLoading,
  dispatchUpdateInboxFilters,
} from "../../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  const updateFilters = (payload) =>
    dispatch(dispatchUpdateInboxFilters(payload));
  const itemsLoading = useSelector(selectItemsLoading);
  return {
    updateFilters,
    itemsLoading,
  };
};
