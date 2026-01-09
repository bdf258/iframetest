import {
  dispatchAddCasenote,
  selectCaseId,
} from "../../../slice/viewCaseSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  return {
    caseId: useSelector(selectCaseId),
    addCasenote: (casenote) => dispatch(dispatchAddCasenote(casenote)),
  };
};
