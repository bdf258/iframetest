import {
  dispatchSetCaseworkers,
  selectCaseDetails,
  selectCasenotesFetching,
  selectCasenotesHasMore,
  selectShowCaseStatusModal,
} from "./slice/viewCaseSlice";

import { useDispatch, useSelector } from "react-redux";
import { getQueryStringParamMap } from "../../helpers/queryString";

const caseID = parseInt(getQueryStringParamMap().get("caseID"));

export const useReduxSlice = () => {
  const dispatch = useDispatch();

  const caseDetails = useSelector(selectCaseDetails);
  const hasMore = useSelector(selectCasenotesHasMore);
  const casenotesFetching = useSelector(selectCasenotesFetching);
  const showCaseStatusModal = useSelector(selectShowCaseStatusModal);

  const setCaseworkers = (caseworkers) =>
    dispatch(dispatchSetCaseworkers(caseworkers));

  return {
    hasMore,
    caseDetails,
    casenotesFetching,
    showCaseStatusModal,
    caseID,
    setCaseworkers,
  };
};
