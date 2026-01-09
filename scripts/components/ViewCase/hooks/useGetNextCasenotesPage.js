import {
  dispatchMergeCasenotes,
  dispatchSetCasenotesFetching,
  dispatchSetCasenotesPage,
  dispatchSetCasenotesTotalPages,
  dispatchSetCasenotesTotalResults,
  selectCasenotesPage,
  selectCasenotesTotalPages,
} from "../slice/viewCaseSlice";
import { useDispatch, useSelector } from "react-redux";

import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { getQueryStringParamMap } from "../../../helpers/queryString";
import { removeInvalidCaseNotes } from "../helpers/removeInvalidCaseNotes";
import { useContext } from "react";
import { userPreferences } from "../../../helpers/localStorageHelper";

const caseID = parseInt(getQueryStringParamMap().get("caseID"));

/**
 *
 * @param {boolean} allowSetFetching - by default the casenotesFetching value in
 * redux will be set to false when the api returns, this param allows you to
 * disable that
 * @returns {func} - function that loads the next casenotes page when called
 */
const useGetNextCasenotesPage = (allowSetFetching = true) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const dispatch = useDispatch();

  const mergeCasenotes = (casenotes) =>
    dispatch(dispatchMergeCasenotes(casenotes));
  const setCasenotesTotalResults = (totalResults) =>
    dispatch(dispatchSetCasenotesTotalResults(totalResults));
  const setCasenotesFetching = (fetching) =>
    dispatch(dispatchSetCasenotesFetching(fetching));
  const page = useSelector(selectCasenotesPage);
  const casenotesTotalPages = useSelector(selectCasenotesTotalPages);
  const setCasenotesTotalPages = (totalPages) =>
    dispatch(dispatchSetCasenotesTotalPages(totalPages));
  const setCasenotesPage = (page) => dispatch(dispatchSetCasenotesPage(page));

  const orderBy = userPreferences.viewCaseOrder;

  return async () => {
    if (casenotesTotalPages < page) {
      return;
    }

    setCasenotesFetching(true);
    await api
      .getAllCasenotes(caseID, { page, orderBy }, modalActions, iln)
      .then(({ results, totalResults, totalPages }) => {
        setCasenotesPage(page + 1);
        setCasenotesTotalResults(totalResults);
        setCasenotesTotalPages(totalPages);
        mergeCasenotes(removeInvalidCaseNotes(results));
      })
      .finally(() => {
        allowSetFetching && setCasenotesFetching(false);
      });
  };
};

export default useGetNextCasenotesPage;
