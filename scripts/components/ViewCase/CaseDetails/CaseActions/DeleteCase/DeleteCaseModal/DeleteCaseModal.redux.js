import {
  dispatchSetCasenotes,
  dispatchSetCasenotesPage,
  dispatchSetCasenotesTotalResults,
  selectCasenotesTotalResults,
} from "../../../../slice/viewCaseSlice";
import { useDispatch, useSelector } from "react-redux";

export const useReduxSlice = () => {
  const dispatch = useDispatch();
  const casenotesTotalResults = useSelector(selectCasenotesTotalResults);
  const setCasenotes = (casenotes) => dispatch(dispatchSetCasenotes(casenotes));
  const setCasenotesTotalResults = (totalResults) =>
    dispatch(dispatchSetCasenotesTotalResults(totalResults));
  const setCasenotesPage = (page) => dispatch(dispatchSetCasenotesPage(page));

  return {
    casenotesTotalResults,
    setCasenotesTotalResults,
    setCasenotes,
    setCasenotesPage,
  };
};
