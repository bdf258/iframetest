import parentFieldOptions from "../DisplayConditionList/util/parentFieldOptions";
import { useReducer } from "react";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_NAME": {
      return { ...state, name: payload };
    }
    case "SET_PARENT_OBJECT": {
      return { ...state, parent_object: payload };
    }
    case "SET_DISPLAY_CONDITION": {
      return { ...state, display_conditions: {} };
    }
    case "EDIT_DISPLAY_CONDITION": {
      const { conditional_block } = payload;

      return {
        ...state,
        display_conditions: {
          ...state.display_conditions,
          ...conditional_block,
        },
      };
    }
    case "REMOVE_ALL_DISPLAY_CONDITIONS": {
      return { ...state, display_conditions: {} };
    }
    case "REMOVE_DISPLAY_CONDITION": {
      const { parentObjectField, parent_object } = payload;

      const display_conditions = Object.entries(
        state.display_conditions
      ).reduce((acc, [displayCondition, value]) => {
        const parentObjectFieldForStorage =
          parentFieldOptions[parent_object][parentObjectField]?.customBlock
            ?.storedAgainst;

        if (displayCondition === parentObjectFieldForStorage) {
          return acc;
        }
        return { ...acc, [displayCondition]: value };
      }, {});

      const dereferencedState = {
        ...state,
        display_conditions,
      };

      return { ...dereferencedState };
    }
    case "ADD_NEW_DISPLAY_CONDITION": {
      return {
        ...state,
        display_conditions: { ...state.display_conditions, ...payload },
      };
    }
    default: {
      throw new Error(`The ACTION of TYPE: ${type} is not recognised`);
    }
  }
};

const blankCustomBlock = {
  name: "",
  type: "custom",
  parent_object: "cases",
  display_conditions: [],
};
const useCustomBlock = (initialState) => {
  const dereferencedInitialState = {
    ...initialState,
    ...(initialState?.display_conditions && {
      display_conditions: { ...initialState.display_conditions },
    }),
  };

  const [state, dispatch] = useReducer(reducer, {
    ...blankCustomBlock,
    ...dereferencedInitialState,
  });
  return [state, dispatch];
};

export default useCustomBlock;
