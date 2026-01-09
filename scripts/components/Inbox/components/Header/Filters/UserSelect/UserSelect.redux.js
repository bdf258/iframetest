import {
  selectCaseworkers,
  selectFilterCaseworkerID,
  dispatchUpdateInboxFilters,
} from "../../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  const caseworkerID = useSelector(selectFilterCaseworkerID);
  const caseworkers = useSelector(selectCaseworkers);
  const updateFilters = (payload) =>
    dispatch(dispatchUpdateInboxFilters(payload));

  return { caseworkerID, caseworkers, updateFilters };
};
