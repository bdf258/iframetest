import { useReducer } from "react";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_CASE_FIELD": {
      return { ...state, parentObjectField: payload };
    }
    case "EDIT_DISPLAY_CONDITION": {
      const { parentObjectFieldOption, parentObjectFieldOptionIndex } = payload;
      state.parentObjectFieldOptions[parentObjectFieldOptionIndex] =
        parentObjectFieldOption;
      return {
        ...state,
        parentObjectFieldOptions: [...state.parentObjectFieldOptions],
      };
    }
    case "RESET_DISPLAY_CONDITIONS": {
      return { ...state, parentObjectFieldOptions: [] };
    }
    case "ADD_TEMP_DISPLAY_CONDITION": {
      return {
        ...state,
        parentObjectFieldOptions: [...state.parentObjectFieldOptions, null],
      };
    }
    case "REMOVE_DISPLAY_CONDITION": {
      const { index } = payload;
      state.parentObjectFieldOptions.splice(index, 1);
      return {
        ...state,
      };
    }
    default: {
      throw new Error(`The ACTION of TYPE: ${type} is not recognised`);
    }
  }
};
const useDisplayConditions = (initialState = {}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
  });
  return [state, dispatch];
};

export default useDisplayConditions;
