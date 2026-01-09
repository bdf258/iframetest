import { selectCasePermissions } from "../../../slice/viewCaseSlice";
import { useSelector } from "react-redux";

export const useReduxSlice = () => {
  const casePermissions = useSelector(selectCasePermissions);

  return {
    casePermissions,
  };
};
