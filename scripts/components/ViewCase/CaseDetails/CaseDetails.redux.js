import { selectCaseDetails, selectCaseworkers } from "../slice/viewCaseSlice";

import { useSelector } from "react-redux";

export const useReduxSlice = () => {
  const caseworkers = useSelector(selectCaseworkers);
  const caseDetails = useSelector(selectCaseDetails);

  return {
    caseworkers,
    caseDetails,
  };
};
