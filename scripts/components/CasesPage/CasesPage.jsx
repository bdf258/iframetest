import React, { useContext, useEffect } from "react";

import FiltersAndActions from "./components/FiltersAndActions";
import MatchingCases from "./components/MatchingCases";
import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { removeMalformedCaseworkers } from "./helpers/removeMalformedCaseworkers";
import { sortCaseworkersAlphabetically } from "./helpers/sortCaseworkersAlphabetically";
import { splitCaseworkersByActive } from "./helpers/splitCaseworkersByActive";
import useCasesState from "./hooks/useCasesState";

let abortController;

const CasesPage = () => {
  const [state, dispatch] = useCasesState();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  useEffect(() => {
    api.getCaseworkers(modalActions, iln).then((caseworkers) => {
      caseworkers = removeMalformedCaseworkers(caseworkers);
      const { active, inactive } = splitCaseworkersByActive(caseworkers);
      const sortedCaseworkers = [
        ...sortCaseworkersAlphabetically(active),
        ...sortCaseworkersAlphabetically(inactive),
      ];
      dispatch({ type: "SET_CASEWORKERS", payload: sortedCaseworkers });
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "SET_RESULTS",
      payload: { ...state.results, cases: undefined },
    });

    if (abortController) abortController.abort();
    abortController = new AbortController();

    api
      .searchCases(state.filters, modalActions, iln, abortController.signal)
      .then((result) =>
        dispatch({
          type: "SET_RESULTS",
          payload: result,
        })
      );
  }, [state.filters]);

  return (
    <React.Fragment>
      <FiltersAndActions state={state} dispatch={dispatch} />
      <MatchingCases state={state} dispatch={dispatch} />
    </React.Fragment>
  );
};

export default CasesPage;
