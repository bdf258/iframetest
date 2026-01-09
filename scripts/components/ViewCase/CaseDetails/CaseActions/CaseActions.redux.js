import { selectCaseId, selectConstituent } from "../../slice/viewCaseSlice";

import { useSelector } from "react-redux";

export const useReduxSlice = () => {
  const constituent = useSelector(selectConstituent);
  const caseID = useSelector(selectCaseId);

  return {
    constituent,
    caseID,
  };
};
