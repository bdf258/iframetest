import {
  selectCases,
  selectConstituents,
  selectFilterInboxType,
} from "../../../../slice/inboxSlice";

import { useSelector } from "react-redux";

export const useReduxSlice = (caseID) => {
  const inboxType = useSelector(selectFilterInboxType);
  const constituents = useSelector(selectConstituents);
  const cases = useSelector(selectCases);

  const _case = cases[caseID];
  const constituentID = _case?.constituentID;
  const constituent = constituents[constituentID];

  return {
    inboxType,
    constituent,
  };
};
