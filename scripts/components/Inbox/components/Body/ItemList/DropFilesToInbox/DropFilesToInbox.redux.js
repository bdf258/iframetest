import {
  dispatchAddResults,
  selectFilterCaseworkerID,
} from "../../../../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  const addResults = (payload) => dispatch(dispatchAddResults(payload));
  const caseworkerID = useSelector(selectFilterCaseworkerID);

  return {
    addResults,
    caseworkerID,
  };
};
