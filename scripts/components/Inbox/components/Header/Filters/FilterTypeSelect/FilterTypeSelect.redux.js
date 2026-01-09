import {
  selectFilterContainsType,
  dispatchUpdateInboxFilters,
} from "../../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  const type = useSelector(selectFilterContainsType);
  const updateFilters = (payload) =>
    dispatch(dispatchUpdateInboxFilters(payload));

  return { type, updateFilters };
};
