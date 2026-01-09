import { selectContactTypes } from "../../../../ViewCase/slice/viewCaseSlice";
import { useSelector } from "react-redux";

export const useReduxSlice = () => {
  return {
    contactTypes: useSelector(selectContactTypes),
  };
};
