import {
  selectFilterInboxType,
  dispatchUpdateInboxFilters,
} from "../../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  const type = useSelector(selectFilterInboxType);
  const updateFilters = (payload) =>
    dispatch(dispatchUpdateInboxFilters(payload));

  return { type, updateFilters };
};
