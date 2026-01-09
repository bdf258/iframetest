import {
  dispatchSetConstituent,
  selectCaseDetails,
  selectCasePermissions,
} from "../../../slice/viewCaseSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  const caseDetails = useSelector(selectCaseDetails);
  const casePermissions = useSelector(selectCasePermissions);
  const setConstituent = (constituent) =>
    dispatch(dispatchSetConstituent(constituent));

  return {
    setConstituent,
    caseDetails,
    casePermissions,
  };
};
