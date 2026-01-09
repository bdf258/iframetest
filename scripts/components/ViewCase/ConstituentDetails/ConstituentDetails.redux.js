import {
  selectConstituent,
  selectDoNotContactTypes,
} from "../slice/viewCaseSlice";

import { useSelector } from "react-redux";

export const useReduxSlice = () => {
  const constituent = useSelector(selectConstituent);
  const doNotContactTypes = useSelector(selectDoNotContactTypes);

  return {
    constituent,
    doNotContactTypes,
  };
};
