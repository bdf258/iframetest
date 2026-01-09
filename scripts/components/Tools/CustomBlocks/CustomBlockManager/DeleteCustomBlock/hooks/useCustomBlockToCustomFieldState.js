import { useReducer } from "react";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_CUSTOM_FIELD_MAP": {
      const { customFieldIndex, mapToCustomBlockId } = payload;
      state.customFieldsToMap[customFieldIndex] = {
        ...state.customFieldsToMap[customFieldIndex],
        mapToCustomBlockId,
      };
      return {
        ...state,
      };
    }

    default: {
      throw new Error(`The ACTION of TYPE: ${type} is not recognised`);
    }
  }
};
const useCustomBlockToCustomFieldState = (initialState) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState });
  return [state, dispatch];
};

export default useCustomBlockToCustomFieldState;
