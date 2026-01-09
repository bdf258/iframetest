import {
  dispatchUpdateInboxFilters,
  selectFilterContainsValue,
} from "../../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  const updateFilters = (payload) =>
    dispatch(dispatchUpdateInboxFilters(payload));

  const containsValue = useSelector(selectFilterContainsValue);

  return {
    updateFilters,
    containsValue,
  };
};
