import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONSTITUENT_ID":
      return {
        ...state,
        constituent: { ...state.constituent, id: action.payload },
      };
    case "SET_CASE_ID":
      return {
        ...state,
        caseID: action.payload,
      };
    case "SET_VIEW":
      return {
        ...state,
        previousView: state.view,
        view: action.payload,
      };
    case "SET_CONSTITUENT_DETAILS":
      return {
        ...state,
        constituent: { id: state.constituent.id, ...action.payload },
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const useAssignState = (initialState = {}) => {
  const [state, dispatch] = useReducer(reducer, {
    caseID: undefined,
    view: undefined,
    previousView: undefined,
    constituent: {},
    ...initialState,
  });
  return [state, dispatch];
};

export default useAssignState;
