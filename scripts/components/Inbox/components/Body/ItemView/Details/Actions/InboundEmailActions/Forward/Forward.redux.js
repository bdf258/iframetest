import {
  selectCases,
  selectContactTypes,
} from "../../../../../../../slice/inboxSlice";

import { useSelector } from "react-redux";

export const useReduxSlice = () => {
  return {
    contactTypes: useSelector(selectContactTypes),
    cases: useSelector(selectCases),
  };
};
