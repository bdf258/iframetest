import initialFilters from "../consts/initialFilters";
import { setCasesFilterOptions as updateLocalStorage } from "../../../helpers/localStorageHelper";
import { useReducer } from "react";

const initialState = {
  caseworkers: undefined,
  filters: initialFilters,
  view: "table",
  results: {
    cases: undefined,
    page: 1,
    resultsPerPage: undefined,
    totalResults: undefined,
  },
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_CASEWORKERS":
      return { ...state, caseworkers: payload };
    case "SET_FILTERS": {
      const filters = {
        ...payload,
        pageNo: payload.pageNo !== state.filters.pageNo ? payload.pageNo : 1,
      };
      updateLocalStorage({
        datetime: new Date().toISOString(),
        filters,
      });
      return {
        ...state,
        filters,
      };
    }
    case "REMOVE_CUSTOM_FILTER": {
      const customFields = { ...state.filters.customFields };
      delete customFields[payload];
      return {
        ...state,
        filters: { ...state.filters, customFields },
      };
    }
    case "UPDATE_FILTERS": {
      return { ...state, filters: { ...state.filters, ...payload } };
    }
    case "SET_VIEW":
      return { ...state, view: payload };
    case "SET_RESULTS":
      return { ...state, results: payload };

    default:
      throw new Error(`Invalid action type: ${type}`);
  }
};

const useCasesState = () => useReducer(reducer, initialState);

export default useCasesState;
