import {
  dispatchUpdateInboxFilters,
  selectFilterSortDirection,
} from "../../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  const sortDirection = useSelector(selectFilterSortDirection);
  const updateFilters = (payload) =>
    dispatch(dispatchUpdateInboxFilters(payload));
  return { sortDirection, updateFilters };
};
