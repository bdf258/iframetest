import {
  selectCases,
  selectCaseworkers,
} from "../../../../../../slice/inboxSlice";

import { useSelector } from "react-redux";

export const useReduxSlice = (caseID) => {
  const cases = useSelector(selectCases);
  const caseworkers = useSelector(selectCaseworkers);

  return { caseDetails: cases[caseID], caseworkers };
};
