import {
  dispatchAddResults,
  dispatchSetItemsLoading,
  selectFilters,
} from "../slice/inboxSlice";
import { useDispatch, useSelector } from "react-redux";

import TranslationContext from "../../../context/translation/TranslationContext";
import api from "@electedtech/api";
import { useContext } from "react";

let abortController;

const useGetItems = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const iln = useContext(TranslationContext);

  return () => {
    dispatch(dispatchSetItemsLoading(true));

    if (abortController)
      abortController.abort(
        iln.gettext("Filters updated before previous async returned")
      );
    abortController = new AbortController();
    const signal = abortController.signal;

    api
      .inboxSearch(
        {
          ...filters,
          actioned: filters.inboxType === "inbox" ? false : undefined,
        },
        undefined,
        undefined,
        signal
      )
      .then((results) => {
        dispatch(dispatchAddResults(results));
      })
      .catch(() => {}) // catch abort error
      .finally(() => {
        dispatch(dispatchSetItemsLoading(false));
      });
  };
};

export default useGetItems;
