import {
  dispatchSetCustomFields,
  selectCaseDetails,
  selectCustomFields,
} from "../slice/viewCaseSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  return {
    caseDetails: useSelector(selectCaseDetails),
    customFieldValues: useSelector(selectCustomFields),
    updateCustomBlock: (customBlock) =>
      dispatch(dispatchSetCustomFields(customBlock)),
  };
};
