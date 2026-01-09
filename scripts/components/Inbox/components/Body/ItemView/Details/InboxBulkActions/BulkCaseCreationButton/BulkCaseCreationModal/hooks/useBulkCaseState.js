import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, view: action.payload };
    case "SET_CASE_DETAILS":
      return { ...state, caseDetails: action.payload };
    case "SET_MATCH_DETAILS":
      return { ...state, matchDetails: action.payload };
    case "SET_CASES":
      return { ...state, cases: action.payload };
    case "SET_CASES_CREATED":
      return { ...state, casesCreated: action.payload };
    case "SET_CASES_MATCHED":
      return { ...state, casesMatched: action.payload };
    case "SET_EMAILS_ACTIONED":
      return { ...state, emailsActioned: action.payload };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const useBulkCaseState = (emails = []) => {
  const [state, dispatch] = useReducer(reducer, {
    view: "caseDetails",
    caseDetails: {},
    matchDetails: {},
    emails,
    casesCreated: undefined,
    casesMatched: undefined,
    emailsActioned: undefined,
  });
  return [state, dispatch];
};

export default useBulkCaseState;
